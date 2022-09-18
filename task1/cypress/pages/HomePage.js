class HomePage{
    elements = {
      searchField: () => cy.get("#search_query_top"),
      searchSubmitButton:()=>cy.get("button[name='submit_search']"),
      productsListing:() => cy.get("h5[itemprop='name'] a"),
      categoryListing:(categoryName)=>cy.get(`a[title='${categoryName}']`),
      colorButton:(colorName)=>cy.xpath(`//a[text()='${colorName}']/parent::label/preceding-sibling::input`),
      categoryButton:(categoryName)=>cy.xpath(`//span[normalize-space()='Categories']/../..//a[contains(text(),'${categoryName}')]`),
      categoryFilterPanel: () => cy.get("div[id='enabled_filters'] li:nth-child(1)"),
      colorFilterPanel:() => cy.get("div[id='enabled_filters'] li:nth-child(2)"),
      productPath:(productName)=> cy.xpath(`//li[@class='ajax_block_product col-xs-12 col-sm-4 col-md-3 first-in-line first-item-of-tablet-line first-item-of-mobile-line']//a[@title='${productName}']/../..//span[contains(text(),'Add to cart')]`),
      checkoutButton:() => cy.get("a[title='Proceed to checkout'] span"),
      cartProduct:(productName)=>cy.xpath(`//a[normalize-space()='${productName}']`)
    };

 

    enterProductNameOnSearchField(searchKeyword){
      this.elements.searchField().click()
      this.elements.searchField().type(searchKeyword)   
      this.elements.searchSubmitButton().click()
    
    }

    searchProductInListing(productName){

      this.elements.productsListing().each(item =>{
        expect(item.text()).to.have.string(productName)
        
      })
    }
      clickOnCategoryPage(categoryName){

        this.elements.categoryListing(categoryName).click()

      }

      clickOnColor(colorName){
        cy.wait(5000)
        this.elements.colorButton(colorName).click()
      }
      clickOnCategory(categoryName){
        this.elements.categoryButton(categoryName).click()
      }

      validateColorAndCategory(colorName,categoryName){
        cy.wait(5000)
        this.elements.categoryFilterPanel().should('contain.text', categoryName)

       
        this.elements.colorFilterPanel().should('contain.text',colorName)

      }

      addProductToCart(productName){
        this.elements.productPath(productName).click()
        
      }

      validateProductAddedInCart(productName){
        cy.wait(5000)
        this.elements.checkoutButton().click()
        this.elements.cartProduct(productName).should('contain.text', productName)
        


      }
      
   
  
  }
  
  module.exports = new HomePage();