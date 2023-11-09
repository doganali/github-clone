# github-clone

A github clone using react ts

# Description

The project contains three main pages:

- Simple dashboard with a search bar:

![Screenshot 2023-11-09 at 16.37.15.png](..%2F..%2FDesktop%2FScreenshot%202023-11-09%20at%2016.37.15.png)

- Search results in Repository and User scope:

![Screenshot 2023-11-09 at 16.37.27.png](..%2F..%2FDesktop%2FScreenshot%202023-11-09%20at%2016.37.27.png)

- User profile with their repos and further information:

![Screenshot 2023-11-09 at 16.37.35.png](..%2F..%2FDesktop%2FScreenshot%202023-11-09%20at%2016.37.35.png)

There are many improvements that can be made in the pages in terms of UX which are explained in the comments in
corresponding places as in the below example:

![Screenshot 2023-11-09 at 16.41.24.png](..%2F..%2FDesktop%2FScreenshot%202023-11-09%20at%2016.41.24.png)

Some of the important components are also documented in the comments:

![Screenshot 2023-11-09 at 16.48.13.png](..%2F..%2F..%2F..%2Fvar%2Ffolders%2Fst%2Fj6tj35vj2fsgbcy6tg2k98th0000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_ljhdQ2%2FScreenshot%202023-11-09%20at%2016.48.13.png)

Not all pages follow the conventions due to time constraints. SearchResultsPage is the only page that follows the
styling guides:

![Screenshot 2023-11-09 at 16.49.07.png](..%2F..%2F..%2F..%2Fvar%2Ffolders%2Fst%2Fj6tj35vj2fsgbcy6tg2k98th0000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_k0aoSX%2FScreenshot%202023-11-09%20at%2016.49.07.png)

![Screenshot 2023-11-09 at 16.49.25.png](..%2F..%2F..%2F..%2Fvar%2Ffolders%2Fst%2Fj6tj35vj2fsgbcy6tg2k98th0000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_vXHc9c%2FScreenshot%202023-11-09%20at%2016.49.25.png)

## Future Improvements

# UX Improvements

- **Loading state management** is one of the most important UX improvement that I can made. They are mostly just a text
  and sets the entire page into loading. Skeleton animations or similar loading animations are definitely needed for a
  better ux
- **Design System** is mostly missing. Text styles, coloring, main components such as Navbars, Rows, List tiles can be
  extracted in a design system folder and used across the project
- **Pagination** is missing for all the search calls. It is a vital improvement for a real life project for a better UX and Engineering.
- **Repository and User search result list tiles** have very few information: stars, languages and mroe data can be
  added:
  ![Screenshot 2023-11-09 at 16.53.56.png](..%2F..%2F..%2F..%2Fvar%2Ffolders%2Fst%2Fj6tj35vj2fsgbcy6tg2k98th0000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_EtmCB4%2FScreenshot%202023-11-09%20at%2016.53.56.png)

# Code Improvements

- File Structure
    - I have tried to follow a file structure convention as below:
      ![Screenshot 2023-11-09 at 16.55.24.png](..%2F..%2F..%2F..%2Fvar%2Ffolders%2Fst%2Fj6tj35vj2fsgbcy6tg2k98th0000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_lf6SWX%2FScreenshot%202023-11-09%20at%2016.55.24.png)
      There are three main layers: `app`, `api` and `design-system` for the corresponding layers of the
      project. `design-system` component is the most immature one as it does not contain all the components and some of
      the components actually should not be in this folder, rather they should be in the corresponding app module (
      e.g., `FilterOption` since it is only used in `SearchResultsPage`)
    - Inside `app` layer, there are modules corresponding the pages in the
      project: `dashboard`, `search-results`, `user-profile`.
- Api Service
    - Api service has the most potention for improvement:
        1. Implement authentication for increased rate limits and access to more features. Currently, the service works
           if the user has logged in through the browser, but authenticated requests would allow for better scalability
           and reliability.
        2. Refine error handling to provide more descriptive messages and handle specific scenarios better, securely.
        3. Expand the functionality to include additional filters and search criteria as per the GitHub API
 capabilities.
        4. Consider adding caching mechanisms to reduce the number of API calls and improve response times.
        5. Optimize the construction of query strings to handle a wider range of search parameters and to prevent potential
   issues with URL encoding.
        6. Explore GraphQL GitHub API for more flexible and efficient data retrieval.
