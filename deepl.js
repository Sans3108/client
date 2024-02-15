const axios = require('axios');
const fs = require('fs');

const YOUR_DEEPL_API_KEY = '5b4731ca-50da-1d40-0848-15bb36e7f373:fx';
const TARGET_LANGUAGE = 'DE'; // Example: Change to your desired language code

async function translateValuesInArray(inputArray) {
  const translatedArray = inputArray.map(async (item) => {
    if (item.value) {
      const translatedValue = await translateText(item.value);
      return { ...item, value: translatedValue };
    } else {
      return item; 
    }
  });

  return Promise.all(translatedArray); 
}

async function translateText(text) {
  const deeplUrl = 'https://api-free.deepl.com/v2/translate';
  const params = {
    auth_key: YOUR_DEEPL_API_KEY,
    text: text,
    target_lang: TARGET_LANGUAGE,
    formality: 'less' 
  };

  try {
    const response = await axios.post(deeplUrl, null, { params });
    return response.data.translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; 
  }
}

// Example usage:
const arrayOfObjects = [
    {
      "_id": "0bcee6dc-3abd-413c-bbbb-55459bfac143",
      "value": "Never have I ever watched the Ghostbusters remake."
    },
    {
      "_id": "98f9dbdc-6b86-4f05-acaf-d78b9202af94",
      "value": "Never have I ever wanted to be one of the Kardashians."
    },
    {
      "_id": "d211893d-8a0c-4648-8d5e-a388931617d9",
      "value": "Never have I ever dressed as the opposite sex."
    },
    {
      "_id": "19e6663f-bc9b-426b-a524-d39c1aa43c1f",
      "value": "Never have I ever watched SpongeBob SquarePants."
    },
    {
      "_id": "6e819eba-8be2-444a-8879-c379e509a02c",
      "value": "Never have I ever cried during a Pixar movie. (Darn you, Bing Bong!)"
    },
    {
      "_id": "a9cb26ca-35d9-45dc-aa36-037dc01a509d",
      "value": "Never have I ever had a crush, or a man crush, on Ron Swanson."
    },
    {
      "_id": "e4ce8ce7-9923-4224-8164-f10125cdba9d",
      "value": "Never have I ever 'cleaned up' by piling everything into a closet."
    },
    {
      "_id": "6acf0bcb-8d78-42d9-8bde-8ecdb0ce16f0",
      "value": "Never have I ever sung karaoke."
    },
    {
      "_id": "ab83c074-da3f-4510-97d1-ad53a665cb6f",
      "value": "Never have I ever watched the 'Gangnam Style' music video."
    },
    {
      "_id": "d0c30422-7de6-4054-9552-4b909580f3f4",
      "value": "Never have I ever had a crush on someone from Full House."
    },
    {
      "_id": "2e49384d-3e61-480a-b07b-2c05a92a84f1",
      "value": "Never have I ever watched an episode of Gilmore Girls."
    },
    {
      "_id": "4c978362-91a4-4922-a367-4b14f10960ca",
      "value": "Never have I ever pretended to know a stranger."
    },
    {
      "_id": "1d8573cf-b840-4614-ac9c-183538628f6b",
      "value": "Never have I ever worn sleepwear and pretended it was clothing."
    },
    {
      "_id": "37578339-04d4-4f50-8e65-c1db323c57bf",
      "value": "Never have I ever said 'excuse me' when there was no one around."
    },
    {
      "_id": "90ced470-9268-408f-b903-532fbebfc490",
      "value": "Never have I ever scared myself in a mirror."
    },
    {
      "_id": "2b0c03e8-42c8-4929-a999-26358df5d995",
      "value": "Never have I ever missed a high five."
    },
    {
      "_id": "3570f3fd-72ca-44a5-a957-6058e82fcd4e",
      "value": "Never have I ever heard someone else doing it."
    },
    {
      "_id": "68676dfd-a04b-4271-b861-12a20663ce74",
      "value": "Never have I ever sang in the shower."
    },
    {
      "_id": "4da04a5f-ede0-492d-86d9-847bfe0bb6ff",
      "value": "Never have I ever blamed farts on an animal."
    },
    {
      "_id": "b49cc58d-8575-47e7-bce7-00f67e85a689",
      "value": "Never have I ever secretly wished I were a wizard at Hogwarts."
    },
    {
      "_id": "3c9ee428-a9f8-4a87-919e-590b6c0fce7f",
      "value": "Never have I ever slept in regular clothing."
    },
    {
      "_id": "a9e30139-34e1-4b12-a49b-3fcd5f2a67ed",
      "value": "Never have I ever had a nightmare about zombies chasing me."
    },
    {
      "_id": "e0e3dbfd-b243-49f8-8e07-c10cbd65d4ee",
      "value": "Never have I ever pretended to laugh at a joke I didn't get."
    },
    {
      "_id": "bd472580-d1d0-4c31-9e9c-bde33f041884",
      "value": "Never have I ever been scared of clowns."
    },
    {
      "_id": "0e77214a-aec9-473f-8b0e-84c4439dd15f",
      "value": "Never have I ever thought a cartoon character was hot."
    },
    {
      "_id": "103d6f71-314b-47d4-af1f-449e08c72f9f",
      "value": "Never have I ever faked being sick so I could play video games."
    },
    {
      "_id": "efef1fa5-01d1-4df0-9a79-81ce15584488",
      "value": "Never have I ever liked Star Wars more than Star Trek."
    },
    {
      "_id": "03502efb-a67d-4534-8b4d-7a232b7ef007",
      "value": "Never have I ever tried out to be an extra in a movie."
    },
    {
      "_id": "3594c998-9615-45b6-ba34-97c0fea5a23f",
      "value": "Never have I ever scored over 100 while bowling."
    },
    {
      "_id": "4079ec16-c7a5-41db-894d-6e3e449c5af7",
      "value": "Never have I ever used an Instant Pot."
    },
    {
      "_id": "f1ce262b-dfa5-41f0-afa5-6b5caaf94571",
      "value": "Never have I ever played Candy Crush."
    },
    {
      "_id": "4be23e66-bb52-448a-8041-71bae3f69da5",
      "value": "Never have I ever won a game of Scrabble."
    },
    {
      "_id": "40c57434-11e4-4ca4-ab7b-e2c231c84aa9",
      "value": "Never have I ever made a duck face when taking a selfie."
    },
    {
      "_id": "c819ecd0-c908-4503-9149-ed9ba7678dbd",
      "value": "Never have I ever looked out the car's passenger seat window and imagined it was a scene from a music video."
    },
    {
      "_id": "d06c711b-4bc7-4c36-8024-49e948f02538",
      "value": "Never have I ever actually laughed out loud when typing LOL."
    },
    {
      "_id": "e2bcb7b0-e28a-4ab3-9e0e-ae32d27faef8",
      "value": "Never have I ever reread an email immediately after sending it."
    },
    {
      "_id": "c382c97d-d4ec-4020-a05b-99bc6dcf2b29",
      "value": "Never have I ever daydreamed about being on a talk show and what I'd talk about."
    },
    {
      "_id": "3a8a2202-24c5-43d9-a1f2-9be61da1da94",
      "value": "Never have I ever Googled my own name to see what comes up."
    },
    {
      "_id": "da37ece1-3914-4731-bc8e-80344b614a20",
      "value": "Never have I ever pretended I was running from zombies while on a run."
    },
    {
      "_id": "43a1caed-4d74-4bec-baa1-cbf4c686981b",
      "value": "Never have I ever sat in the shower."
    },
    {
      "_id": "cae0c216-f1a2-4a26-a019-8a7c6a1599f7",
      "value": "Never have I ever tried something I saw on Pinterest."
    },
    {
      "_id": "5607e655-ff18-4333-b33c-48a5a687a31e",
      "value": "Never have I ever ugly cried for no reason."
    },
    {
      "_id": "fbe22653-6e8a-4df2-b244-a3a34f79d734",
      "value": "Never have I ever creeped on someone I just met on social media."
    },
    {
      "_id": "a3a0ab99-5a54-477b-8cee-fabfda10236d",
      "value": "Never have I ever thought about how a loved one could identify me if my face was horribly disfigured in an accident."
    },
    {
      "_id": "40664fec-a1a3-4396-a46c-113a3f3e6f8c",
      "value": "Never have I ever answered someone 'left' or 'right' without thinking, because I have a 50/50 chance of being correct."
    },
    {
      "_id": "1ed03a0a-c664-438a-b10c-f3e9df299b8b",
      "value": "Never have I ever re-gifted a gift card."
    },
    {
      "_id": "c744c44c-f02f-442e-a020-7af2ce733fd4",
      "value": "Never have I ever traveled out of state by myself."
    },
    {
      "_id": "59305f30-9a9f-4d2d-9029-ee186ccf6b7f",
      "value": "Never have I ever flown in a helicopter."
    },
    {
      "_id": "a4f32c14-ab4f-47d8-a7c4-56245da7bfd3",
      "value": "Never have I ever been on stage in front of a crowd."
    },
    {
      "_id": "5ec5c0bc-7783-483f-a628-d43021a4bb01",
      "value": "Never have I ever lied in a job interview."
    },
    {
      "_id": "11411f71-bbbf-471a-a59a-d1e3eff55aa4",
      "value": "Never have I ever stalked a crush."
    },
    {
      "_id": "6087ff63-da95-4b51-b65d-c8d13971ca8e",
      "value": "Never have I ever sung karaoke."
    },
    {
      "_id": "f3a8dd5b-e7e5-478b-bbf5-2a8f153cf75c",
      "value": "Never have I ever agreed with something Donald Trump said."
    },
    {
      "_id": "fda7cb64-b756-4825-a981-83b598815e1f",
      "value": "Never have I ever thought about what type of dog I would be."
    },
    {
      "_id": "9a0c4d4b-fa8c-43df-bd5e-4c48c088515c",
      "value": "Never have I ever watched children's cartoons I'm too old for."
    },
    {
      "_id": "f891fd37-9386-4408-9ad0-7ebcb7d0d174",
      "value": "Never have I ever lost sunglasses that I was already wearing."
    },
    {
      "_id": "9ee385ce-8ea6-4138-95d2-944d6490be29",
      "value": "Never have I ever locked my keys in my car."
    },
    {
      "_id": "5bcbdd9d-538f-4d35-a651-fd6e99bb4ac9",
      "value": "Never have I ever not tipped at a restaurant."
    },
    {
      "_id": "842a43d3-7668-48d1-b102-7dd564c329be",
      "value": "Never have I ever given money to a homeless person."
    },
    {
      "_id": "8a6e54dc-5452-4854-915d-0f6dfead7384",
      "value": "Never have I ever tried to look at the sun."
    },
    {
      "_id": "aa018beb-5b7d-4cbc-8c9e-f52272547ae7",
      "value": "Never have I ever bungee-jumped."
    },
    {
      "_id": "8384bbf0-e69f-4dab-ad2f-d77516f609b2",
      "value": "Never have I ever had surgery."
    },
    {
      "_id": "27691337-5fa7-45fa-b292-0b800327750d",
      "value": "Never have I ever jumped out of a plane."
    },
    {
      "_id": "5ecaf06d-2d34-48ee-867f-f372e75b693d",
      "value": "Never have I ever made a wish at a fountain."
    },
    {
      "_id": "4fd0c251-3390-4da8-90de-a5dd34156842",
      "value": "Never have I ever accidentally eaten a bug."
    },
    {
      "_id": "4f91b705-f03d-4897-87aa-8542cc542f4a",
      "value": "Never have I ever cut someone in line."
    },
    {
      "_id": "e92ea83c-59fc-421f-967b-ffd7f0bfd2c8",
      "value": "Never have I ever stayed up all night."
    },
    {
      "_id": "41eb39e0-9722-4d3a-9dc6-c743ff957a89",
      "value": "Never have I ever read a single Harry Potter book."
    },
    {
      "_id": "d364cf1b-4132-453f-b1a5-7fbec936c0d2",
      "value": "Never have I ever been inside of a library."
    },
    {
      "_id": "9739182b-5508-4469-8ab3-db42cee0a454",
      "value": "Never have I ever lied about my age."
    },
    {
      "_id": "c73deec2-4c3d-4c75-a2a2-1d6b134e9ffe",
      "value": "Never have I ever shot a gun."
    },
    {
      "_id": "9b5e2c56-d205-42c1-af9e-1e0aea53a365",
      "value": "Never have I ever had a cavity."
    },
    {
      "_id": "3685faf7-034c-4314-9186-e8dcaca724c8",
      "value": "Never have I ever been mini-golfing."
    },
    {
      "_id": "051e3407-096f-4b2a-b921-ff8560802f1f",
      "value": "Never have I ever seen an elephant in real life."
    },
    {
      "_id": "b21276cc-93ce-4d54-b5ce-d5f8765e8bdb",
      "value": "Never have I ever been to Disney World."
    },
    {
      "_id": "60452323-0505-4d96-9a09-797c678652bf",
      "value": "Never have I ever bought clothing online."
    },
    {
      "_id": "439a12f6-de4b-4d40-abaf-9614f793d7db",
      "value": "Never have I ever had someone draw a caricature of me."
    },
    {
      "_id": "3856a61c-c879-4307-81d5-76f844313c55",
      "value": "Never have I ever owned an Xbox."
    },
    {
      "_id": "4c67e318-a3ff-430b-885d-fba9b2dcef25",
      "value": "Never have I ever spent hours watching funny videos on YouTube."
    },
    {
      "_id": "17e7feac-0e3f-418d-840a-6ff2860757c0",
      "value": "Never have I ever seen Titanic."
    },
    {
      "_id": "15dc9764-6022-421c-9b30-75d7faea6109",
      "value": "Never have I ever met a celebrity."
    },
    {
      "_id": "7f6d4691-cdf5-4e28-97a2-5c34b479cd12",
      "value": "Never have I ever thought a movie was better than the book."
    },
    {
      "_id": "7e4a0a7c-9d8f-4c4b-ad6e-31d7cf5d82e1",
      "value": "Never have I ever voted."
    },
    {
      "_id": "4fb81cd7-f016-45ff-ad77-3713895da272",
      "value": "Never have I ever owned a watch."
    },
    {
      "_id": "6ee2eb30-985d-4527-b202-3e7bdce0033d",
      "value": "Never have I ever ridden a skateboard."
    },
    {
      "_id": "704825f6-200a-4dff-b7fb-3e245f5cb373",
      "value": "Never have I ever learned how to play a musical instrument."
    },
    {
      "_id": "38544db0-bfe2-4fdd-9e26-8063d60fba4f",
      "value": "Never have I ever seen snow."
    },
    {
      "_id": "68983f56-4897-4037-8df1-f78e0e6dc0ef",
      "value": "Never have I ever finished a Sudoku puzzle."
    },
    {
      "_id": "8b09cac3-58be-4dee-930f-a4e00022d7c9",
      "value": "Never have I ever Googled something so I'd know how to spell it."
    },
    {
      "_id": "804d1ca1-7846-4b2c-bb57-53ffd4b8248b",
      "value": "Never have I ever cheated on a test."
    },
    {
      "_id": "33f4a009-feda-40c4-9048-cd604e8817d8",
      "value": "Never have I ever cried watching Homeward Bound."
    },
    {
      "_id": "6c9debdd-ad79-4623-a767-74d41e69105a",
      "value": "Never have I ever licked a frozen pole."
    },
    {
      "_id": "50f44c3b-4ec4-400d-8677-4e8dab4e5afc",
      "value": "Never have I ever had gum in my hair."
    },
    {
      "_id": "801dd376-8320-423c-8527-9c8318a29256",
      "value": "Never have I ever taken a horrible picture on picture day."
    },
    {
      "_id": "7299f9e0-f39e-46df-8528-0f0b185e3e91",
      "value": "Never have I ever been a bully."
    },
    {
      "_id": "4cfe45ae-c76f-499b-b86e-282d956a665f",
      "value": "Never have I ever wanted to be a superhero."
    },
    {
      "_id": "eb1dc8d2-c528-4c66-9ef1-e1aff14da94f",
      "value": "Never have I ever been scared of the dark."
    },
    {
      "_id": "6ab20f28-471f-4efc-bdc7-fa333b154cf2",
      "value": "Never have I ever had trouble sleeping after watching a scary movie."
    },
    {
      "_id": "7ef13bd7-0c2a-4c13-9dfb-ea58197ae7c8",
      "value": "Never have I ever stayed up all night."
    },
    {
      "_id": "dc8daf64-72bc-4a29-80c6-99f4288a6eb5",
      "value": "Never have I ever been to a sleepover."
    },
    {
      "_id": "f75a0db1-147d-4ee1-b779-03f5befb6765",
      "value": "Never have I ever had a birthday party."
    },
    {
      "_id": "01eb50ae-6d29-4d63-8839-3b02f075b96e",
      "value": "Never have I ever cried at school"
    },
    {
      "_id": "5deb4abb-4256-4e1b-a04d-86dd65bac186",
      "value": "Never have I ever sang on a stage."
    },
    {
      "_id": "f0821716-91a2-466b-ad73-7cfad22c59cf",
      "value": "Never have I ever performed in a talent show."
    },
    {
      "_id": "1feb2723-223f-409f-8207-07cea76e4d0e",
      "value": "Never have I ever killed ants with a magnifying glass."
    },
    {
      "_id": "dc46f25f-8027-4111-ad29-6d329a867d42",
      "value": "Never have I ever dropped Mentos into Coke or Pepsi."
    },
    {
      "_id": "abd00a20-77cc-4e41-8cd2-96b8056438ad",
      "value": "Never have I ever eaten something on a dare."
    },
    {
      "_id": "8bc8a594-9226-4bdb-afb2-d2371b6a66c2",
      "value": "Never have I ever used the excuse 'My dog ate my homework.'"
    },
    {
      "_id": "fb93d3b7-02e6-4a8b-bbd7-99a411d8d4a2",
      "value": "Never have I ever sucked my thumb."
    },
    {
      "_id": "dffb28ba-8470-4151-8c39-2cbfc04d0230",
      "value": "Never have I ever believed my toys had feelings."
    },
    {
      "_id": "c100fba0-603f-46e8-9bf1-1ce5005b3c65",
      "value": "Never have I ever watched Blue's Clues."
    },
    {
      "_id": "5ec96aa9-247f-4971-81fc-7d7f4b535313",
      "value": "Never have I ever been terrified of a theme park ride."
    },
    {
      "_id": "87c6b0b7-81d3-45e5-9a34-62aec813f315",
      "value": "Never have I ever been to a haunted house."
    },
    {
      "_id": "501bd592-3f49-4d18-9ecf-37d4bfb2fc4e",
      "value": "Never have I ever dressed up as a zombie for Halloween."
    },
    {
      "_id": "ff263dc0-bc07-4ca0-90bd-6238bf40552b",
      "value": "Never have I ever been sent to the principal's office."
    },
    {
      "_id": "97317b49-c0d1-41a5-be9a-d3a4ec300cd7",
      "value": "Never have I ever done an Easter egg hunt."
    },
    {
      "_id": "4f1629e9-755b-443e-81ca-97e727bd2d7b",
      "value": "Never have I ever built a fort with blankets."
    },
    {
      "_id": "d5603cf9-5246-4fe0-b6bc-2775676f4ae3",
      "value": "Never have I ever fallen off a bike."
    },
    {
      "_id": "d6e7ef2c-a68d-42f1-b156-be46ae742b36",
      "value": "Never have I ever played video games all day."
    },
    {
      "_id": "1c65bdab-653f-44ec-bbfe-4dcee9e7e3bb",
      "value": "Never have I ever stolen money from a sibling's piggy bank."
    },
    {
      "_id": "0d5ed4d6-8695-419c-b22b-6a8d263c17fd",
      "value": "Never have I ever wished I had bunk beds."
    },
    {
      "_id": "7c21ad6d-5ffc-40dd-9ae4-eb55678be2b4",
      "value": "Never have I ever played Pokémon."
    },
    {
      "_id": "c36fd24e-0898-40d6-ae52-3f91cc74b349",
      "value": "Never have I ever been on a family road trip."
    },
    {
      "_id": "973ae0c8-f21e-4f8e-a30a-639ba21148ea",
      "value": "Never have I ever named a stuffed animal."
    },
    {
      "_id": "cfc6d9d3-5de0-4421-bb9b-c6daa979eb2c",
      "value": "Never have I ever used training wheels."
    },
    {
      "_id": "63bc5f85-34f0-4758-9379-898238c0e2b4",
      "value": "Never have I ever eaten only candy for dinner."
    },
    {
      "_id": "6ba9d0b9-193e-4879-b895-729e834c51d5",
      "value": "Never have I ever stayed in character all day."
    },
    {
      "_id": "1a8fd021-7e06-42b2-87dc-da4cba2631b0",
      "value": "Never have I ever lied about being related to someone on TV."
    },
    {
      "_id": "0c1fc7f2-1644-47d9-8edb-2d035194702e",
      "value": "Never have I ever written notes on the desk to use during a test."
    },
    {
      "_id": "c1ea099a-c52d-4c59-afc2-2081563da11a",
      "value": "Never have I ever tried to sign a permission slip for my parents."
    },
    {
      "_id": "692de30f-b37f-4f0f-946d-f75ce8041bac",
      "value": "Never have I ever stolen a friend's story and pretended it happened to me."
    },
    {
      "_id": "26476529-b83b-43c8-850f-0308fe4616cc",
      "value": "Never have I ever thrown something out of the school bus window."
    },
    {
      "_id": "6e88c401-308b-4914-a2bd-8f1677b6705b",
      "value": "Never have I ever lied about staying after school and gone somewhere else."
    },
    {
      "_id": "7ee90a56-1810-4680-9c4c-1b6dad968de7",
      "value": "Never have I ever hopped seats on the school bus."
    },
    {
      "_id": "3942ee9e-e943-40d8-a6fb-df69e3911f88",
      "value": "Never have I ever binge-eaten Little Debbie cakes."
    },
    {
      "_id": "b425167a-ca4e-4701-9d3c-301d6e8fefca",
      "value": "Never have I ever eaten at Taco Bell more than three times in a week."
    },
    {
      "_id": "f67eca4b-b4d0-40e7-b701-2043004a00c6",
      "value": "Never have I ever eaten a carton of ice cream by myself."
    },
    {
      "_id": "4df8d236-0378-4105-8c68-630a80d695b7",
      "value": "Never have I ever been to Arby's."
    },
    {
      "_id": "7eacefde-8837-44f3-a114-0ab27408ecd9",
      "value": "Never have I ever had a deep-fried candy bar."
    },
    {
      "_id": "96e7116a-4d19-4207-ab52-8d5d1f23e736",
      "value": "Never have I ever eaten from someone else's plate when they weren't looking."
    },
    {
      "_id": "224f53c3-1e57-419a-96fb-64fa4b34fc11",
      "value": "Never have I ever eaten something cold because I was too lazy to heat it up."
    },
    {
      "_id": "09f62270-e85e-486a-b641-8d5c6f99cf0e",
      "value": "Never have I ever eaten pumpkin pie."
    },
    {
      "_id": "28d9b458-e8f6-4d65-bc75-39aa3a9afbab",
      "value": "Never have I ever tried chicken and waffles."
    },
    {
      "_id": "3c06cbb4-2456-4104-89dd-5eed238bd1e6",
      "value": "Never have I ever tried anchovies."
    },
    {
      "_id": "7e0e3a9b-9b4e-408e-bd8a-4d94bc38fefc",
      "value": "Never have I ever dipped french fries into a milkshake."
    },
    {
      "_id": "c7e2ff01-7421-4719-b18b-3089a45bbd7f",
      "value": "Never have I ever eaten a salad."
    },
    {
      "_id": "bce058a1-de85-418e-a254-db82b4db4989",
      "value": "Never have I ever bought myself a Happy Meal."
    },
    {
      "_id": "476386d5-c121-4d19-9a05-2cc894979e0f",
      "value": "Never have I ever eaten more than three hot dogs at once."
    },
    {
      "_id": "9258d73c-29d3-4205-a3d2-519040d0eb14",
      "value": "Never have I ever tried a restaurant's food challenge."
    },
    {
      "_id": "39bbaa9d-f4af-4b00-a4e0-4e2617f1e7a3",
      "value": "Never have I ever tried to eat six Saltines in a minute."
    },
    {
      "_id": "44498bfe-294e-4df2-95ee-b35fac292a0a",
      "value": "Never have I ever put ice cubes in my milk and cereal."
    },
    {
      "_id": "e3b788a4-a0ec-4b1d-9e4e-950ade847e5a",
      "value": "Never have I ever drank pickle juice."
    },
    {
      "_id": "a8baed31-db7e-4b20-afb7-a387a1302fc8",
      "value": "Never have I ever put candy on pizza."
    },
    {
      "_id": "21014601-be28-4637-9a92-79c0b4362548",
      "value": "Never have I ever tried pickles with peanut butter."
    },
    {
      "_id": "9b2822b7-4512-4518-a95a-9a3650e78bc8",
      "value": "Never have I ever salted watermelon."
    },
    {
      "_id": "7bee7199-5b20-4f2a-a225-9b9179da7514",
      "value": "Never have I ever tried a banana and mayonnaise sandwich."
    },
    {
      "_id": "91358cda-f8dc-4740-b169-b5463b271fee",
      "value": "Never have I ever tried baby food."
    },
    {
      "_id": "463c2e70-86af-4183-a837-4a563887a31a",
      "value": "Never have I ever eaten a full frozen pizza by myself."
    },
    {
      "_id": "ce97199b-a27b-4b27-b8e8-398e34d862af",
      "value": "Never have I ever made a gross smoothie."
    },
    {
      "_id": "c455ebea-07d3-4ded-b2a7-22e993c7febf",
      "value": "Never have I ever tried counting how many licks it took to get to the center of a Tootsie Pop."
    },
    {
      "_id": "739e762e-c2b0-40f5-ad65-149cd63dcc8f",
      "value": "Never have I ever drank Surge."
    },
    {
      "_id": "f474301f-5767-452b-a71a-affea26cb63e",
      "value": "Never have I ever eaten Pop Rocks."
    },
    {
      "_id": "a3289622-a43e-41a0-bb1f-2fa1789661c9",
      "value": "Never have I ever eaten a Hot Pocket."
    },
    {
      "_id": "f061bf80-2d7e-4050-af30-446f8ffbfd80",
      "value": "Never have I ever eaten alligator."
    },
    {
      "_id": "b087b565-6a62-4e72-9a3e-26fdae2ae4ea",
      "value": "Never have I ever tried BBQ pork nachos."
    },
    {
      "_id": "1965e28e-a7da-4c03-a7c1-945cbcc3efd2",
      "value": "Never have I ever cleaned out the fridge and found food over a year old."
    },
    {
      "_id": "cc89aec4-53d7-4df3-9510-f0e866ec15ac",
      "value": "Never have I ever cooked Thanksgiving dinner."
    },
    {
      "_id": "fb33eb44-a151-41e0-9714-97cd7b3fd935",
      "value": "Never have I ever counted calories."
    },
    {
      "_id": "f6239334-bc5e-4e52-97b0-767018f25878",
      "value": "Never have I ever burnt my mouth willingly because I was too hungry to wait."
    },
    {
      "_id": "a703548b-4ffd-4252-87a5-af2fbae75157",
      "value": "Never have I ever eaten Spam."
    },
    {
      "_id": "1eced96d-5a31-4d3f-816e-b10c5e4f927e",
      "value": "Never have I ever chewed with my mouth open."
    },
    {
      "_id": "b71568c4-b9c3-4418-a0ed-97cc315482d2",
      "value": "Never have I ever used a baby spoon to eat ice cream so it would last longer."
    },
    {
      "_id": "bf4fd043-d1a6-4019-8797-589d8a7be655",
      "value": "Never have I ever eaten butter by itself."
    },
    {
      "_id": "6008f805-d5a2-436c-a1a9-d949708d5c68",
      "value": "Never have I ever eaten food while still standing with the fridge door open."
    },
    {
      "_id": "b727a5e5-e950-4e38-aff2-de8fb39f5cbf",
      "value": "Never have I ever eaten a spoonful of frosting."
    },
    {
      "_id": "a0c238eb-d499-4f97-8895-3b6f80c2e805",
      "value": "Never have I ever tried Taco Bell breakfast."
    },
    {
      "_id": "7725e06e-2e4e-4032-a99a-e1f56a66ed72",
      "value": "Never have I ever daydreamed about donuts."
    },
    {
      "_id": "ee202af6-5c0f-4f9b-bea7-9e7d98c3b50c",
      "value": "Never have I ever eaten pizza for two or more meals in a day."
    },
    {
      "_id": "633eeed5-8909-47b5-b3a4-f4cb2e3658cc",
      "value": "Never have I ever tried eggs with runny yolks."
    },
    {
      "_id": "07794ef4-c54e-422c-80be-3065a459b16d",
      "value": "Never have I ever been pulled over."
    },
    {
      "_id": "61a6ff48-020d-4664-b975-b03d6bea16b5",
      "value": "Never have I ever tried to flee the cops."
    },
    {
      "_id": "6c236bfd-047f-4bbf-bf21-5a5bcbf2034c",
      "value": "Never have I ever driven drunk."
    },
    {
      "_id": "33e6d454-a7cf-4005-ba8c-3d95efe82740",
      "value": "Never have I ever been arrested."
    },
    {
      "_id": "5d237048-4ed2-4dfb-ac69-6f5e91b066c7",
      "value": "Never have I ever used a fake ID."
    },
    {
      "_id": "4d799952-91e6-403d-b7cc-d9e95e30cd6e",
      "value": "Never have I ever snuck into a club."
    },
    {
      "_id": "1ac3b2e4-8d9a-4bcb-b445-096d7e0f5084",
      "value": "Never have I ever smuggled food or candy into a movie theater."
    },
    {
      "_id": "2551025a-5135-4425-9bf9-7e7483ae38c9",
      "value": "Never have I ever stolen money from someone."
    },
    {
      "_id": "402841cc-277d-4d2c-9b96-9be19f6538ff",
      "value": "Never have I ever been in handcuffs."
    },
    {
      "_id": "581f0c47-a336-4f72-b701-d451273f7dc0",
      "value": "Never have I ever spent time in detention."
    },
    {
      "_id": "6c8444b0-ee6b-467c-856a-06443c39b59c",
      "value": "Never have I ever snuck out of the house."
    },
    {
      "_id": "90b5ff5c-4204-4c8d-b608-82e00ffbaad6",
      "value": "Never have I ever lied to my parents about where I was going."
    },
    {
      "_id": "09772c85-f309-46a7-9425-bcb8b24cdc48",
      "value": "Never have I ever crashed a party or wedding."
    },
    {
      "_id": "1123b665-a4b8-449d-ab07-151436dc6b92",
      "value": "Never have I ever shoplifted from a store."
    },
    {
      "_id": "d830052e-734d-45e3-b8fb-70025853aba2",
      "value": "Never have I ever had to call the cops on someone."
    },
    {
      "_id": "1a0a137e-7ad6-4321-a423-73d9bb5af168",
      "value": "Never have I ever gotten into a fistfight."
    },
    {
      "_id": "3f36fbd3-ad24-449e-80cd-581c70014315",
      "value": "Never have I ever thrown something at a moving car."
    },
    {
      "_id": "5c73ee1c-f02d-435f-9cb8-adfb218b5d1e",
      "value": "Never have I ever called the cops on someone."
    },
    {
      "_id": "ad0d8ac0-b620-41a9-911f-c64daacccf89",
      "value": "Never have I ever flirted with a police officer in hopes of not getting a ticket."
    },
    {
      "_id": "bc01f21f-7c06-41a2-b70d-8849daa5c637",
      "value": "Never have I ever lied to a police officer."
    },
    {
      "_id": "02171699-8cbd-471a-a36f-c0c2b4d09134",
      "value": "Never have I ever prank called 911. (Bad idea!)"
    },
    {
      "_id": "90d7c60f-f53c-4a88-850f-b3379705b911",
      "value": "Never have I ever bought something stolen."
    },
    {
      "_id": "c4c8c9ed-d3d4-4aec-9cb2-184b8467250a",
      "value": "Never have I ever dine and dashed."
    },
    {
      "_id": "e39f256c-3f91-4a6e-a596-f9226294b128",
      "value": "Never have I ever been drunk in public."
    },
    {
      "_id": "e0e39804-d490-4800-8c2d-d1d1f8aec19e",
      "value": "Never have I ever littered."
    },
    {
      "_id": "f708eab6-cb9f-43a6-b4ad-68073cc4863f",
      "value": "Never have I ever ran a red light."
    },
    {
      "_id": "fc8427d6-9fc0-43d0-bdf7-f0de8a99ec32",
      "value": "Never have I ever broken in somewhere."
    },
    {
      "_id": "a86fa55d-1e68-4e38-92a6-3374b002a3ae",
      "value": "Never have I ever jumped a fence."
    },
    {
      "_id": "97c12c50-fba8-4cad-a882-ab9896be4380",
      "value": "Never have I ever drank before turning 21."
    },
    {
      "_id": "76a31034-3900-414e-b3f3-9223c8cded90",
      "value": "Never have I ever returned an item I used or clothing I wore."
    },
    {
      "_id": "92d587b6-6bf2-48ac-ab69-54a17752d58e",
      "value": "Never have I ever downloaded music illegally."
    },
    {
      "_id": "b4ad121a-886e-4bfd-9389-e4060828b3e3",
      "value": "Never have I ever stolen Wi-Fi from an unsecured network."
    },
    {
      "_id": "e8e8455f-e3d7-40cc-ae80-86ec5ccbde51",
      "value": "Never have I ever spit out gum onto the ground."
    },
    {
      "_id": "60716b29-6241-4bf9-a445-4636c41db03c",
      "value": "Never have I ever jaywalked."
    },
    {
      "_id": "e49444bb-a302-457b-97d8-91e867c32c0f",
      "value": "Never have I ever shared passwords to services so family or friends didn't have to pay."
    },
    {
      "_id": "f770513a-d5b0-4860-970d-62fd641ef4b4",
      "value": "Never have I ever been in violation of a school dress code."
    },
    {
      "_id": "faca97e9-8e84-42b2-a696-7c96c063e10f",
      "value": "Never have I ever made a fake social media account."
    },
    {
      "_id": "c0991e5f-2d46-4f62-9fca-cffb8d700735",
      "value": "Never have I ever played poker at home for money."
    },
    {
      "_id": "b0c333ba-106f-4b32-abbc-ed3ad0e862e4",
      "value": "Never have I ever driven without wearing a seatbelt."
    },
    {
      "_id": "881e59b9-91c4-41f6-9ebf-5dd79d3f1870",
      "value": "Never have I ever used my cell phone while driving."
    },
    {
      "_id": "d8f58915-816c-45f4-a924-4554418a6fed",
      "value": "Never have I ever crossed state lines to buy better fireworks."
    },
    {
      "_id": "98b6dd03-b587-4b9a-95bc-7c0629acc2bc",
      "value": "Never have I ever used medicine that was prescribed to me."
    },
    {
      "_id": "7bbc6643-223f-4e36-b2b1-fa20f9fb4c66",
      "value": "Never have I ever ridden a bike on the sidewalk."
    },
    {
      "_id": "8b7f3192-0f26-4026-9611-b7a78e282552",
      "value": "Never have I ever passed a vehicle in a 'no-passing' zone."
    }
  ];

translateValuesInArray(arrayOfObjects)
  .then(translatedArray => {
    const translatedJson = JSON.stringify(translatedArray, null, 2); // Format as JSON

    fs.writeFile('translations-de-nhie.json', translatedJson, (err) => {
      if (err) {
         console.error('Error writing file:', err);
      } else {
         console.log('Translations saved to translations.json');
      }
    });
  })
  .catch(error => console.error('Error:', error));