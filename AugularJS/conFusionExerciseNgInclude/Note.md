### Objectives and Outcomes

In this exercise, you will explore Angular templates and how they are constructed using HTML. You will then use the ngInclude directive to include an Angular template within a page. At the end of this exercise, you will be able to:

- Construct Angular templates using HTML
- Include Angular templates in a page using the ngInclude directive

### The index.html File

- Download the *index.html* page provided above and put it in the app folder.
- Next, go to the head of the page and make sure that the <html> tag includes the ngApp directive:

```
<html lang="en" ng-app="confusionApp">
```

- Next, edit *menu.html,* *contactus.html* and *dishdetail.html* pages and remove the header information and the scripts from the bottom of the page. Retain only the content enclosed within and including the container div.
- Now go to index.html and include the following between the header and the footer in the page:

```
    <ng-include src="'menu.html'"></ng-include>
```

Now you can see the resulting web page.

- You can replace the *menu.html* in the *ngInclude* above with *dishdetail.html* and *contactus.html* to see the result.

### Conclusions

In this exercise we explored Angular templates and the use of the ngInclude directive to include Angular templates within a page.