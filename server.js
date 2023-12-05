import express from "express";
import cors from 'cors';
import openai from "./config/open-ai.js";
//import readlineSync from 'readline-sync';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
  res.status(200).send({
      message: "hello there"
  })
});

app.post('/', async (req, res) => {
    const prompt = req.body.prompt;

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {"role": "assistant", "content": "Only answer about Pariveh portal or try to rearch related terms to parivesh like Forest Clearance(WC), Environment Clearence(WC), Wildlife Clearence(WC) or Costal region Clearance(CRZ) or the promts below. Say 'Have a nice day' if user sends exit or bye"},
          {"role":"user","content":"What is KYA?"},
          {"role":"assistant","content":" Know Your Approval (KYA) is a GIS/MIS-based tool to help an applicant identify the tentative approvals required for the proposed project. It may be noted that the list of approvals indicated by this module is based on user input and shall be used for guidance purposes only."},
          {"role":"user","content":"Is e-KYC required for Know Your Approval"},
          {"role":"assistant","content":"No, e-KYC is not required for Know Your Approval."},
          {"role":"user","content":"What are the prerequisites for KYA analysis?"},
          {"role":"assistant","content":"The project proponent is only required to select Project Activity & Sub-activity; enter capacity in the prescribed units; and upload the KML of the project/activity to generate the tentative list of required tentative clearances through the KYA module."},
          {"role":"assistant","content":"'e-KYC (Know Your Customer) is a mechanism to verify the identity of an Aadhaar number holder through an online electronic KYC service. The e-KYC service provides authenticated instant identity verification."},
          {"role":"user","content":"Is it mandatory to have the e-KYC done?"},
          {"role":"assistant","content":"Yes. e-KYC refers to the process of identifying and verifying the uniqueness of the registered user. It is a mandatory process that must be completed at the time of registering with PARIVESH."},  
          {"role":"user","content":"What is the procedure for e-KYC?" },
          {"role":"assistant","content":"e-KYC, also known as electronic Know Your Customer, is part of the registration process. The user is required to enter the PAN number and the assistant will validate the PAN from NSDL through APIs. For other entities, the user is required to enter the CIN number and the assistant will validate the CIN from the MCA server."},
          {"role":"user","content":"Is it required to do e-KYC again in the new PARIVESH if it has already been done in the existing one?"},
          {"role":"assistant","content":"No. In the case of an entity registered in the existing PARIVESH, the same login credentials can be used."},
          {"role":"user","content":"Who is required to do e-KYC?"},
          {"role":"assistant","content":"All entities are required to comply with e-KYC. e.g., private companies/central PSUs/state PSUs/government departments/joint ventures; individual project proponents; consultants."},
          {"role":"user","content":"Can users update their profiles?"},
          {"role":"assistant","content":"Yes, all users can update their profiles. If there are any changes in the information provided during registration, then the user is required to update their profile post-registration"},
          {"role":"user","content":"How can users update their profiles?"},
          {"role":"assistant","content":"As of now, users can only update their mobile numbers by clicking on the 'Update Profile' option."},
          {"role": "assistant", "content": "If the question is not related to parivesh portal in any way then answer that it is out of your scope or it is an irrelevent question"},
          {"role": "user", "content": prompt}],
        model: "gpt-3.5-turbo-1106",
      });

      res.status(200).send({
        res: completion.choices[0].message.content
      })
      }

    catch (error){
            console.log(error);
            res.status(500).send({ error});
        }
      })
      app.listen(5000, ()=> console.log('Server is up'));

// async function main() {
//   console.log("Hi,I am your Parivesh Chat assistant, how may i help you")
//   while(true){
//     const userInput = readlineSync.question('You: ');

//     try {
//       const completion = await openai.chat.completions.create({
//         messages: [
//           {"role": "system", "content": "Only answer about Pariveh portal else reply with 'The question is irrelevent'. Say 'Have a nice day' if user sends exit or bye"},
//             {"role": "user", "content": userInput}],
//         model: "gpt-3.5-turbo-1106",
      
//       });

//       const completionText = completion.choices[0].message.content;

//       if (userInput.toLowerCase() === 'exit'){
//         console.log(('Bot :') + completionText);
//         return;
//       }
//       console.log(('Bot :') + completionText);

//       } catch (error) {
//         console.error(error);
//     }

//   }
    
// }
//   main();