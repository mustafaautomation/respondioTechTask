import {
  Given,
  When,
  And,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

const homePage = require("../../pages/HomePage")

Given("A user opens the shopping website", () => {
  cy.visit("/");
});
When("A user enters the product in search with its name {string}", (productName) => {
  homePage.enterProductNameOnSearchField(productName)
});


Then("The products returned are matching with searched term {string}", (productName) => {
  homePage.searchProductInListing(productName)
});

Given("User clicks on {string} Category",(categoryName)=>{
  homePage.clickOnCategoryPage(categoryName)
})



And("User clicks on {string} color",(colorName)=>{
  homePage.clickOnColor(colorName)
})

When("User selects this {string} category",(categoryName)=>{
  homePage.clickOnCategory(categoryName)
})

Then("User gets only Selected {string} color and {string} category items",(colorName,categoryName)=>{
  homePage.validateColorAndCategory(colorName,categoryName)
})


When("User selects product {string} from Popular section and adds to cart",(productName)=>{
  cy.wait(5000)
  homePage.addProductToCart(productName)

})

Then("product {string} is shown in cart",(productName)=>{
    homePage.validateProductAddedInCart(productName)
}) 