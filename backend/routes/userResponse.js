import express from 'express';
import db from './db.js';
import stringSimilarity from 'string-similarity';
import verifyUser from './VerifyUser.js';
import natural from "natural";
import Sentiment from 'sentiment';

const sentiment = new Sentiment();
const stemmer = natural.PorterStemmer;
const TfIdf = natural.TfIdf;
const TextAnalysis = new TfIdf();


const UserResponse = express.Router();
let disciplineNames;
let universityNames;

UserResponse.get('/getRandomQuestions', (req, res) => {
  const sql = "SELECT * FROM riasec_questions ORDER BY RAND() LIMIT 42";
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching questions from the database:', err);
      return res.json({ Error: "Error fetching questions from the database" });
    }

    console.log('Fetched questions:', result);
    return res.json({ questions: result });
  });
});



UserResponse.get('/getuserresponse', verifyUser, (req, res) => {
  const userId = req.session.userId;

  // Retrieve user responses and corresponding trait types
  const sql = `
    SELECT ur.response, rq.traittype
    FROM user_responses ur
    INNER JOIN riasec_questions rq ON ur.question_id = rq.QuestionID
    WHERE ur.user_id = ${userId}
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching user responses from the database:', err);
      return res.json({ error: 'Error fetching user responses from the database' });
    }

    // Calculate scores for each trait type
    const scores = { Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0 };

    result.forEach((row) => {
      const responseWeight = getResponseWeight(row.response);
      scores[row.traittype] += responseWeight;
    });

    // Log scores to the console
    console.log('Scores for each trait type:', scores);

    // Find the combination of the two highest scores
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [firstType, secondType] = sortedScores.slice(0, 2);

    // Extract the first letter of each type
    const firstLetterFirstType = firstType[0].charAt(0);
    const firstLetterSecondType = secondType[0].charAt(0);

    // Combine the first letters into a single string
    const combinedString = firstLetterFirstType + firstLetterSecondType;

    // Log the combination to the console
    console.log('Combination of Personality Types:', { firstType, secondType });

    // Retrieve disciplines based on trait_type_combination
    const disciplinesSql = `
      SELECT discipline_title
      FROM disciplines
      WHERE trait_type_combination = '${combinedString}'
    `;

    db.query(disciplinesSql, (disciplinesErr, disciplinesResult) => {
      if (disciplinesErr) {
        console.error('Error fetching disciplines from the database:', disciplinesErr);
        return res.json({ error: 'Error fetching disciplines from the database' });
      }

      // Extract discipline names into an array
      disciplineNames = disciplinesResult.map((discipline) => discipline.discipline_title);

      // Log all discipline names in one go
      console.log('Disciplines for the Combined String:', disciplineNames);

      // Now, perform the mapping logic for universities
      const unisql = `
      SELECT Program
      FROM university_data;
      `;

      db.query(unisql, (UniversityErr, UniversityResult) => {
        if (UniversityErr) {
          console.error('Error fetching university data from the database:', UniversityErr);
          return res.json({ error: 'Error fetching university data from the database' });
        }

        const universityNames = UniversityResult.map((universityData) => universityData.Program);
        console.log('University Majors: ', universityNames);

        const mappingTable = [];

        for (const discipline of disciplineNames) {
          const result = stringSimilarity.findBestMatch(discipline, universityNames);
          mappingTable.push({
            Discipline: discipline,
            'University Majors: ': result.bestMatch.target,
            'Match Score': parseFloat(result.bestMatch.rating),
          });
        }
        console.log("Original Mapping DataFrame:", mappingTable);

        const threshold = 0.4;
        const higherMatch = mappingTable.filter(entry => entry['Match Score'] >= threshold);
        // const lowerMatch = mappingTable.filter(entry => entry['Match Score'] < threshold);

        console.log("\nMapping DataFrame (Above 1 match score):", higherMatch);
        // console.log("\nMapping DataFrame (Below 1 match score):", lowerMatch);
  
      function analyzeDisciplines(desiredField, interest, disciplines) {
        const allText = (desiredField + " " + interest);
        TextAnalysis.addDocument(allText);
        TextAnalysis.addDocument(disciplines.join(' '));
        const sentimentAnalysis = sentiment.analyze(allText);

        const WordsInText = TextAnalysis.listTerms(0).reduce((counts, term) => {
          counts[term.term] = term.tf;
          return counts;
        }, {});

        const topNTerms = Object.keys(WordsInText).sort((a, b) => WordsInText[b] - WordsInText[a]).slice(0, 8);

        const suggestedDisciplines = disciplines.filter((discipline) => topNTerms.some(term => stemmer.stem(discipline.toLowerCase()).includes(stemmer.stem(term.toLowerCase()))));
        if (suggestedDisciplines.length == 0) {
          console.log('University Major')
          for (const entry of mappingTable) {
            console.log(`${entry['University Major']}`);
        }
          
        } else {
          const discipline_test = universityNames
          console.log("Suggested Disciplines According to User Preference:", suggestedDisciplines);

          console.log("University Program according to Suggested Disciplines: ")
          for (const i of suggestedDisciplines) {
            const StringResult = stringSimilarity.findBestMatch(i, discipline_test);
            if (StringResult.bestMatch.rating >= 0.2) {
              console.log(StringResult.bestMatch.target)
            }
          }
        }
        if (sentimentAnalysis.score > 0) {
          console.log(`You should choose these discipline: ${suggestedDisciplines}`);
        } else if (sentimentAnalysis.score < 0) {
          console.log(`You will most likely won't find these disciplines interesting: ${suggestedDisciplines}`);
        } else {
          console.log(`You are neutral about these disciplines: ${suggestedDisciplines}`);
        }
      }

        const thesql = `SELECT * FROM gradio.user_preference WHERE user_id = ${userId}`;
        let userDesire, userTarget; // Declare variables in an accessible scope

        db.query(thesql, (err, result) => {
          if (err) {
            console.error('Error fetching user preferences from the database:', err);
            return res.json({ error: 'Error fetching user preferences from the database' });
          }

          if (result.length === 0) {
            console.log('No preferences found for the user');
            return res.json({ error: 'No preferences found for the user' });
          }

          userDesire = result[0].user_desire;
          userTarget = result[0].user_target;

        
          const desiredField = userDesire;
          const interest = userTarget;
          const Universities = disciplineNames;

          analyzeDisciplines(desiredField, interest, Universities);

        });

        res.json({
          combination: combinedString,
          disciplines: disciplineNames,
          originalMapping: mappingTable,
          aboveThreshold: higherMatch,
          // belowThreshold: lowerMatch,
        });
      });
    });
  });
});

// Function to get the weight based on the response
function getResponseWeight(response) {
  switch (response) {
    case 'Strongly Disagree':
      return 1;
    case 'Disagree':
      return 2;
    case 'Neutral/Undecided':
      return 3;
    case 'Agree':
      return 4;
    case 'Strongly Agree':
      return 5;
    default:
      return 0;
  }
}


UserResponse.post('/submitResponses', verifyUser, (req, res) => {
  console.log('Received POST request at /submitResponses');
  const userId = req.session.userId
  console.log(userId)
  const userResponses = req.body.userResponses;
  const questions = req.body.questions;
  console.log(req.body)
  if (!userResponses || !Array.isArray(userResponses) || !questions || !Array.isArray(questions)) {
    return res.status(400).json({ error: 'Invalid request format' });
  }
  userResponses.forEach((response, index) => {
    const question = questions[index];
    let responseWeight;
    switch (response) {
      case "Strongly Disagree":
        responseWeight = -2;
        break;
      case "Disagree":
        responseWeight = -1;
        break;
      case "Neutral":
        responseWeight = 0;
        break;
      case "Agree":
        responseWeight = 1;
        break;
      case "Strongly Agree":
        responseWeight = 2;
        break;
      default:
        responseWeight = 0;
    }

    const sql = "INSERT INTO user_responses(user_id, question_id, response, response_weight) VALUES (?, ?, ?, ?)";

    db.query(sql, [userId, question.QuestionID, response, responseWeight], (err, result) => {
      if (err) {
        console.error(`Error inserting user response for question ${question.QuestionID}:`, err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('Successfully inserted into the database.');

    });
  });

  return res.json({ status: 'success' });
});


UserResponse.post('/submituser_preference', verifyUser, (req, res) => {
  const user_id = req.session.userId;
  const { user_desire, user_target } = req.body;
  const sql = "INSERT INTO gradio.user_preference (user_id, user_desire, user_target) VALUES (?, ?, ?)";
  const values = [user_id, user_desire, user_target];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting user preference:', err);
      return res.json({ Error: "Error inserting data in server" });
    }
    return res.json({ Status: "success" });
  });
});


UserResponse.get('/getuser_preference', verifyUser, (req, res) => {
  const userId = req.session.userId;
  const sql = `SELECT * FROM gradio.user_preference WHERE user_id = ${userId}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching user preferences from the database:', err);
      return res.json({ error: 'Error fetching user preferences from the database' });
    }
    // Handle the 'result' from the database query as needed
    return res.json({ preferences: result });
  });
});





UserResponse.post('/submitquestion', (req, res) => {
  const sql = "INSERT INTO riasec_questions(`QuestionText`,`TraitType`,`TraitWeight`) VALUES (?)";
  const values = [
    req.body.QuestionText,
    req.body.TraitType,
    req.body.TraitWeight,
  ]
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Error inserting data in server" });
    return res.json({ Status: "sucess" });
  })
})

export default UserResponse;