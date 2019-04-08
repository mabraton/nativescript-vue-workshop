## Lesson 2 - Navigation

### Intro

In this lesson we are going to familiarize ourselves with navigation techniques.


### Routing configuration

The Angular Router enables navigation from one view to the next as users perform application tasks.

A routed Angular application has one singleton instance of the Router service. When the app's URL changes, that router looks for a corresponding Route from which it can determine the component to display.

When you create a brand new {N} app, you will straight away get a sample `Routes` configuration, which should look like this:

``` javascript
const routes = {
	home: 			Home,
    blue:           Blue,
    red:            Red
}
```

This tells us 3 things:

 * When the app starts, it should automatically redirect to `Home` path,
 * If you navigate to `blue`, you will be provided with `Blue.vue`,
 * If you navigate to `red` you will be provided with `Red.vue`.

<!-- As your application grows, so will your list of routes. One way to manage them is to group them into related `parent<->children` groups like this:

``` javascript
const routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'items', children: [
    { path: '', component: ItemsComponent },
    { path: ':id', component: ItemDetailComponent },
  ]},
  { path: 'articles', children: [
    { path: '', component: ArticlesComponent },
    { path: 'read/:id', component: ArticleComponent },
    { path: 'edit/:id', component: EditArticleComponent },
    { path: 'search/:tech/:keyword', component: ArticleSearchResultsComponent },
  ]},
];
``` -->

<!-- This time:

 * The default path is for `articles`,
 * `items` and `items/:id` are grouped together, which means that we could change `items` to something else in just one place,
 * We can also navigate to `articles`, `articles/read/5`, `articles/edit/5` and `articles/search/angular/navigation` (this will translate to `tech='angular'` and `keyword='navigation'`)
 -->

### Exercise: Routing configuration
<h4 class="exercise-start">
  <b>Exercise</b>: Routing configuration
</h4>

#### Step 1

For this exercise we will use the contents of the `components/color` folder, which already contains some pieces of the app that we need.

Open `main.ts` and change the `render` of the default `[h(router['home'])]` (comment line 40, uncomment line 39).

#### Step 2

Now it is time to add routes for the `Red` and `RGB` components. Update routes, so that:

 * `'red'` path will navigate to `Red.vue` - you can see how this is done for the `blue` example,
 * `'rgb'` path will navigate to `RGB.vue`

<div class="solution-start"></div>
``` javascript
import Home 		from '../components/color/Color';
import Blue 		from '../components/color/Blue';
import Red 			from '../components/color/Red';
import RGB 			from '../components/color/RGB';

const routes = {
	home: 			Home,
	blue:			Blue,
	red:			Red,
	rgb:			RGB
}
```

<div class="solution-end"></div>

<div class="exercise-end"></div>


### Navigation from template
One way to add navigation in markup is with the `@tap` directive and `$goto()` function.

For example, if we want to create a label that should navigate to a “reading” page and pass it a value, such as “5”, we can achieve this by providing an absolute path. That would look something like this:

``` XML
<Label text="Navigation" @tap="$goto( 'articles', { props: { item: '5' } } )"></Label>
```

#### Back

We can also use history. Where you provide the last path based on the page you are currently at.

``` XML
<Button text="Go Back"  @tap="$navigateBack()" class="btn btn-outline"></Button>
```

#### Clear History
Also if you add a `clearHistory` flag, you can clear the navigation stack. Which means that there won't be a back button displayed on iOS, or pressing `back` on Android will not take you back to this page again.

``` XML
<Button text="Go Back"  @tap="$goto( 'home', { clearHistory: true } )" class="btn btn-outline"></Button>
```

#### Backstack Visible
Also if you add a `backstackVisible` flag, you can clear the navigation, pushed in the backstack. If the parameter is set to false then the Page will be displayed but once navigated from it will not be able to be navigated back to.

``` XML
<Button text="Go Back"  @tap="$goto( 'home', { backstackVisible: true } )" class="btn btn-outline"></Button>
```

### Exercise: Navigation with @tap

<h4 class="exercise-start">
  <b>Exercise</b>: Navigation with @tap
</h4>

Open `Color.vue` and update `@tap` for each button, so that:

 * `Blue` button navigates to the `Blue`
 * `Red` button navigates to the `Red`
 * `Pink` button navigates to the `RGB` with prop `'pink'` as the parameter
 * `Gray` button navigates to the `RGB` with prop `'gray'` as the parameter

> **NOTE**: The parameter you pass to the “rgb” route won’t have an effect on that page—yet. Later in this section you’ll utilize that data to change the colors on the “rgb” component.

<div class="solution-start"></div>

Here is the configuration for each:

```
<StackLayout>
    <Button @tap="$goto( 'blue' )"
            text="Open Blue"
            class="btn blue">
    </Button>

    <Button @tap="$goto( 'red' )"
            text="Open Red"
            class="btn red">
    </Button>

    <Button @tap="$goto( 'rgb', { props: { color: 'pink' } } )"
            text="Open RGB (pink)"
            class="btn pink">
    </Button>

    <Button @tap="$goto( 'rgb', { props: { color: 'gray' } } )"
            text="Open RGB (gray)"
            class="btn gray">
    </Button>

</StackLayout>
```

<div class="solution-end"></div>

<div class="exercise-end"></div>


### Navigation with code
Navigation can also be done with JavaScript.

#### Navigation: how to
Once you choose which Router to use, navigation is really easy:

 * import the router you need,
 * call $goto

``` javascript
goBlue()     {
    this.$goto( 'blue' );
}
```

#### Parameters
To use parameters you need to:

 * provide it as a second parameter for `$goto`

``` javascript
goGray()     {
    this.$goto( 'rgb', { props: { color: 'pink' } } );
}
goHome()     {
    this.$goto( 'home', {
        clearHistory:       true
    } );
}
```

### Navigating back

To navigate back, you can use functionality to call:

 * `this.$navigateBack()` - always takes us to back the previous view from the navigation stack,

#### Default iOS and Android back operations

The default `back` button which appears in the iOS `<ActionBar>` performs `backToPreviousPage`, while the Android back button performs `back`.

### Exercise: Navigation with code

<h4 class="exercise-start">
  <b>Exercise</b>: Navigation with code
</h4>

In this exercise we will play with the `blue` component. The `Blue.vue` already contains four buttons, each calling a different function.

Your task is to implement the empty functions in `Blue.vue`, so that:

 * goRed() navigates to the `Red` page
 * goPink() navigates to the `RGB` page with `this.pink` as the parameter
 * goBack() navigates back
 * goHome() navigates home whilst clearing the navigation history


<div class="solution-start"></div>

```
goRed()     {
    this.$goto( 'blue' );
},
goPink()     {
    this.$goto( 'rgb', { props: { color: 'pink' } } );
},
goBack()     {
    this.$navigateBack();
},
goHome()     {
    this.$goto( 'home', {
        clearHistory:       true
    } );
}
```
<div class="solution-end"></div>

<div class="exercise-end"></div>

### Receiving parameters

For components that are expected to receive parameters from the route navigation, you need to use `props`.

You just have to perform the appropriate imports in the module:

#### Import
``` javascript
props:      {
    color:      String
},
```

#### Use

Properties are like data variables.
You can use them in the same way.

``` html
<ActionBar :title="'RGB ' + color" color="white" backgroundColor="blue">
</ActionBar>
```

### Exercise: Receiving parameters

<h4 class="exercise-start">
  <b>Exercise</b>: Receiving parameters
</h4>

In this exercise we will play with the `rgb` component: `RGB.vue`. Currently every time you navigate to `rgb` the input parameters are getting ignored. Your task is to intercept the 'rgb' parameter.

<div class="solution-start"></div>

``` html
<ActionBar :title="'RGB ' + color" color="white" backgroundColor="blue">
</ActionBar>
```

<div class="solution-end"></div>

<div class="exercise-end"></div>

### Page Transitions

One of the great things about NativeScript is its ability to use native animations and page transitions with very little effort.

[Here is a list of all available navigation transitions](http://docs.nativescript.org/api-reference/interfaces/_ui_frame_.navigationtransition.html)

[Here is a list of all available animation curves](http://docs.nativescript.org/api-reference/modules/_ui_enums_.animationcurve.html)

#### Transition

To add pageTransition in html, just add `transition` with a name of the transition you need:

``` XML
<Button
  text="Open Path"
  @tap="$goto( 'blue', { transition: 'slideBottom' } )">
</Button>
```

#### Transition via code

To add page transition in JavaScript, just add a transition object to the `navigate` options. Just like this:

``` javascript
this.$goto( 'home', {
    transition: {
        name: 'slideBottom',
        duration: 500,
        curve: 'linear'
    }
});
```

### Exercise: Page Transitions

<h4 class="exercise-start">
  <b>Exercise</b>: Page Transitions
</h4>

In this exercise we will play with the `color` and `red` components.

#### Step 1

Your task is to update the buttons in `Color.vue`, so that:

 * The `Blue` button triggers `curl` transition
 * The `Red` button triggers the `fade` transition
 * The `Pink` and `Gray` buttons trigger the `flip` transition

 <div class="solution-start"></div>

```
 <StackLayout>
     <Button @tap="$goto( 'blue', { transition: 'curl' } )"
             text="Open Blue"
             class="btn blue">
     </Button>

     <Button @tap="$goto( 'red', { transition: 'fade' } )"
             text="Open Red"
             class="btn red">
     </Button>

     <Button @tap="$goto( 'rgb', { transition: 'flip', props: { color: 'pink' } } )"
             text="Open RGB (pink)"
             class="btn pink">
     </Button>

     <Button @tap="$goto( 'rgb', { transition: 'flip', props: { color: 'gray' } } )"
             text="Open RGB (gray)"
             class="btn gray">
     </Button>

 </StackLayout>
```

<div class="solution-end"></div>

#### Step 2

`Red.vue` already contains 4 buttons, each calling a different function.

Your task is to implement the functions in `Red.vue`, so that:

 * goBlue() navigates to the `Blue` page with page transition `slideTop`, duration `2 seconds` and curve `spring`
 * goGray() navigates to the `RGB` page with `gray` as the parameter and page transition `fade` and duration `1 second`


<div class="solution-start"></div>

```
goBlue()     {
    this.$goto( 'blue', {
        transition:         {
            name:               'slideTop',
            duration:           2000,
            curve:              'spring'
        }
    } );
},
goGray()     {
    this.$goto( 'rgb', {
        props:              {
            color:              'gray'
        },
        transition: {
            name:               'fade',
            duration:           1000
        }
    } );
},
```

<div class="solution-end"></div>

<div class="exercise-end"></div>
