# Idea behind Nextjs Panel

Building a  Dashboard Panel in class based format for next.js that can help to build a dashboard just by using table structure and running commands. Also using prisma for handle tables and data. Main Idea behind Nextjs Panel is to make admin panel development efficient and fast for developers.

## Logic for Nextjs Panel

Handle all dashboard related actions just by class without interfare with UI. 

- Created a Class Name ```Resource```  that define variable and functions related to dashboard.
- Use that ```Resource``` for define table related class and define things related to table schema.
- Handle that class defined functions for Structure UI.

## Feature of Nextjs Panel

Want to create write pre-commands that help to create things own there own. By just defining tables schema in prisma through models can create resource and api with it.

- Define model in ```schema.prisma``` file 
- Run command:
``` bash 
npx nextjs-panel make:resource {model_name}
``` 
that helps to create resource and api based on model schema.
- With that build Page with table and add/update feature just by the command.

## Benefits from Nextjs Panel

Build a panel just by defining models and command. Also get all features related to panel( in future build ).

## Feature To Be

Add all features that a panel should be have in Next.js by just minimal actions: 
- Defining model
- Defining resource class.
- and run commands related to feature.

