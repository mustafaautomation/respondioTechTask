Feature: Product Searching and Adding to Cart

    Analyzing this feature through different scenarios

    Background:
        Given A user opens the shopping website
#Scenario 1 
    Scenario Outline: Users are able to search for an item using the search bar
        When A user enters the product in search with its name "<productName>"
        Then The products returned are matching with searched term "<productName>"
        Examples: product Examples
        |productName|
        |Printed|
        |shirt|
        |Blouse|
#Scenario 2
    Scenario Outline: Users are able to filter search results under Women category by Color and Category
        Given User clicks on "Women" Category
        When User selects this "<categoryName>" category
        And User clicks on "<colorName>" color
        Then User gets only Selected "<colorName>" color and "<categoryName>" category items
           Examples: product Examples
        |colorName|categoryName|
        |Blue|Tops|
        |Orange|Dresses|

#Scenario 3
    Scenario Outline: Users are able to view the details of any clothing item from the `POPULAR` section and add them to the cart
    When User selects product "<productName>" from Popular section and adds to cart
    Then product "<productName>" is shown in cart
     Examples: product Examples
        |productName|
        |Faded Short Sleeve T-shirts|
   
