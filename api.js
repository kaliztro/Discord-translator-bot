// Cypress.Commands.add('googleTradutor', (texto) => {
//     cy.request({
//         method: 'POST',
//         url: `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
//         body: {
//             "q": `${texto}`,
//             "source": "pt-br",
//             "target": "en",
//             "format": "text" 
//         }
//     }).then((response) => {
//         expect(response.status).to.equal(200);
//         let traducao = response.body.data.translations[0].translatedText

//         cy.writeFile('cypress/fixtures/traducoes.txt', traducao)
//         // cy.log(traducao)
//     })
// })

// const fetch = require('node-fetch');

// async function tradutor(){
//     const response = await fetch(
//         `https://swapi.dev/api/people/10/`,
//       );
//       return await response.json();
// }

