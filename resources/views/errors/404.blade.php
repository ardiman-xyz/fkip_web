<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>404 - Page Not Found</title>
   <link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:200,300,400,500,600,700,800" rel="stylesheet" />
   <style>
       body {
           margin: 0;
           padding: 0;
           font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
           min-height: 100vh;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           background-color: #fff;
       }

       .container {
           text-align: center;
       }

       .error-code {
           font-size: 8rem;
           font-weight: 800;
           color: #e6e6e6;
           margin: 0;
           line-height: 1;
       }

       .error-text {
           font-size: 2rem;
           font-weight: 800;
           color: #333;
           margin: 1rem 0;
           margin-top: -40px
       }

       .error-subtext {
           font-size: 1.1rem;
           font-weight: 400;
           color: #666;
           margin-bottom: 2rem;
       }

       .links a {
           color: #2563eb;
           text-decoration: none;
           margin: 0 1rem;
           font-size: 1rem;
           font-weight: 500;
       }

       .links a:hover {
           text-decoration: underline;
       }
   </style>
</head>
<body>
   <div class="container">
       <h1 class="error-code">404</h1>
       <h2 class="error-text">Sorry, couldn't find that page.</h2>
       <p class="error-subtext">Maybe one of these links has what you're looking for?</p>
       
       <div class="links">
           <a href="http://localhost:8007">FKIP</a>
           <a href="https://ods.fkip.umkendari.ac.id">ODS FKIP</a>
           <a href="https://umkendari.ac.id">UM Kendari</a>
       </div>
   </div>
</body>
</html>