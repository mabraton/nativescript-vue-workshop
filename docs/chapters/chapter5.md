## Lesson 3 - Components and Services

### Services

Services are JavaScript functions that are responsible for doing a specific task. Vue services are injected using the `components` flag. There is nothing especially related to Services in NativeScript Vue--there is no ServiceBase class--but still services can be treated as fundamental to Vue applications.

#### Creating a service

Creating a `Service` is really simple. You need to export the functions you want to be available outside:

``` javascript
import Vue                  from 'vue';

export const userService = {
    login,
    relogin,
    logout
};

async function login( username, password ) {
    try {
        let user    = await Vue.http.post( '/auth/login', { username, password } );

        return user.body;
    }
    catch(err) {
        throw err;
    }
}

async function relogin() {
    try {
        let user    = await Vue.http.post( '/auth/relogin', {} );

        return user.body;
    }
    catch(err) {
        throw err;
    }
}

async function logout() {
    try {
        await Vue.http.get( '/auth/logout' );
    }
    catch(err) {
        throw err;
    }
}
```

#### Naming convention

Following the naming convention in Vue, the above service should be placed in a file called: `users.service.js`.

#### Adding the service to `Color.vue`

In order to make our service available in the app, just `import` it.

This is done like this:

```
import { userService }  from '../services/users.service';
```


### HttpClient

NativeScript comes with its own implementation of the `HttpClientModule`, which uses `Android` and `iOS` native functionality to perform the calls.

#### HttpClient: adding the module to the app

This means that all you have to do is declare our NativeScript wrapper in the respective module file and Dependency Injection will take care of the rest.

This is done by adding `Http` module to `Vue`.

``` javascript
import Http from '@billow/nsv-http'

Vue.use( Http, {
    // Configure a base url for all requests
    baseUrl:    'https://www.openligadb.de'
});
```

From this point onwards the code that uses the `Http` module is `exactly the same` as the code you would write for a `web application`.

This gives us a high level Vue `Http` module that is capable of performing various request natively for `Android`, `iOS` and `Web`.

#### HttpClient: calling the service

The http module has a bunch of useful functions like, `get`, `post`, `put`, `delete` and others.
Each takes a `url` as a parameter and optional `options`, and then two functions for getting the response or an error.

``` javascript
this.$http.get( url: string, [options], <response>, <error> )
```

Example of how to call `get` and `subscribe` to the result:

``` javascript
doSomething() {
    this.$http.get(
               '/api/getbltable/bl1/2018',
               resp => {
                   console.log( resp.content );
               },
               err => {
                   alert( err );
               }
           );
}
```

#### HttpClient: Adding Headers to http calls

If you need to pass headers into a `http` call, you can construct it by using `Headers` class, append data and then add it to `options?: RequestOptionsArgs`.

``` javascript
Vue.use( Http, {
  // Configure a base url for all requests
  baseUrl:    'https://www.openligadb.de',
  headers:    {
    'Content-Type':     'application/json',
    'Accept':           'application/json;charset=utf-8'
  }
});
```

### Exercise: Football Service

For this exercise we will use `ServiceTestComponent` located in `components` folder, which you can find in `ServiceTest.vue`.

`ServiceTest` has several buttons, each designed to test a function of the `FootballService` that you will be constructing in this exercise.

The football service is based on [football-data.org API](http://api.football-data.org/documentation)

![Test Service](images/warmup-service-test.png?raw=true)


<h4 class="exercise-start">
  <b>Exercise</b>: Injecting football service
</h4>

Let's start with changing the default route in `main.ts` to `'test'`:

``` javascript
render: h => h('frame', [h(router['test'])])
```

<div class="exercise-end"></div>

This should load an app with a bunch of buttons, but only the first button will provide you with results.

<h4 class="exercise-start">
  <b>Exercise</b>: Implementing the http calls
</h4>

For your convenience the `http` service is already injected into `FootballService` and the header is already configured.

#### Step 1 - Make it work

If you open `football.service.js` you will notice that `getWMTeams` and `getWMGames` are already implemented, which are the functions required to display the data in the `TablesComponent`.

If you press the `Get WM Teams` button or `Get Bundesliga Teams`, you should get the data in the terminal.

#### Step 2 - Implement the missing functions

Your job is to implement the remaining functions:

 * `getTeams` - should make a call to: `/api/getavailableteams/{$temId}/2018` with the `teamId` param,
 * `getGames` - should make a call to: `/api/getmatchdata/{$temId}/2018` with the `teamId` param,
 * `getTable` - should make a call to: `/api/getbltable/{$temId}/2018` with the `teamId` param,,

To implement the first 3 functions, you can follow the `getTeams` function as the example.
To implement `getFixtures`, see `getLeagueTable`, which constructs `URLSearchParams`.

In each function you will need to follow these steps:

 * use the `http` service to call `get()`
 * use `FootballFactory` to convert the `Raw` output into the expected objects

As you implement each of the functions, you can test them with the buttons in the `Service Test`. If you get the data in the terminal, then you most likely did it right. But if you get an error message, then you need to keep working :)

<div class="solution-start"></div>

#### getTeam

``` javascript
public getTeam(teamId: number): Observable<Team> {
  const url = `${this.baseUrl}/teams/${teamId}`;

  return this.http.get<any>(url, { headers: this.header })
  .pipe(
    map(result => FootballFactory.teamFromRaw(result))
  );
}
```

#### getPlayers

``` javascript
public getPlayers(teamId: number): Observable<Player[]> {
  const url = `${this.baseUrl}/teams/${teamId}/players`;

  return this.http.get<any>(url, { headers: this.header })
  .pipe(
    map(result => FootballFactory.playersFromRaw(result))
  );
}
```

#### getTeamFixtures

``` javascript
public getTeamFixtures(teamId: number): Observable<Fixture[]> {
  const url = `${this.baseUrl}/teams/${teamId}/fixtures`;

  return this.http.get<any>(url, { headers: this.header })
  .pipe(
    map(result => FootballFactory.fixturesFromRaw(result))
  );
}
```

#### getFixtures

``` javascript
public getFixtures(competitionId: number, options: FixtureSearchOptions = {}): Observable<Fixture[]> {
  const url = `${this.baseUrl}/competitions/${competitionId}/fixtures`;

  let searchParams = new HttpParams();
  if (options.matchday) {
    searchParams = searchParams.set('matchday', options.matchday.toString());
  } else if (options.timeFrame) {
    searchParams = searchParams.set('timeFrame', options.timeFrame);
  }

  // alternative way
  // let searchParams = this.buildSearchParams(options);

  return this.http.get<any>(url, { headers: this.header, params: searchParams })
  .pipe(
    map(result => FootballFactory.fixturesFromRaw(result))
  );
}
```

<div class="solution-end"></div>

<div class="exercise-end"></div>

### Components

The component is a controller class with a template which mainly deals with a view of the application and logic on the page. It is a bit of code that can be used throughout an application. The component knows how to render itself and configure dependency injection.

The component contains two important things; one is a view and another contains some logic.

<!--A good example of a component is a `LeagueTableComponent` as an example.-->

A component is usually a normal Vue module with template, script and style:

Then we need a Component Class that will encapsulate all the logic.

#### Adding your component to the app
If you try to use your module straight after creating it, you will get an error like this: `NativeScript encountered a fatal error: TypeError: No known component for element my-league-table.`

Solution:

Import the component and put them in `components`:

``` javascript
import LeagueTable                  from './LeagueTable';
```

#### Smart versus Presentation components

Components can be divided into two categories:

 * smart - those contain the business logic of your application. Like a `LoginComponent` that contains the logic of how to log in and where to redirect after user successfully logs in
 * presentation - those are used to encapsulate something that we want to show on the screen. Like a `LogoComponent`, which contains the `img` tag with your logo, which you can paste everywhere you need to display your logo. However when you need to change the logo, you can do it all in one place (the definition of the component).

### Components with custom input (one-way binding)

Just like the `<Label>` component has a `text` attribute, your components can have their own custom attributes as well.

Adding custom attributes to a component is really easy—just add them in `props` element in front of your property set and you are ready to go.

``` javascript
props:      {
    color:      String
},
```

Now you can use it like this:

``` XML
<myColor :color="col"></myColor>
```

### Exercise: Creating a presentation component with input

For this part of the exercise we will be using all components in the `football` folder.

Change the default route in `main.ts` to:

``` javascript
render: h => h('frame', [h(router['tables'])])
```

And run the application. You should get a view displaying a league table and a tab bar for navigation.
When you press the `View Fixtures` button, you will get a list of fixtures.

![League Table](images/warmup-league-table.png?raw=true)
![Fixtures](images/warmup-fixtures.png?raw=true)

Your task is to encapsulate the fixture template into a `Fixture.vue` and use it in `TeamGames.vue` instead of the current fixture template.

<h4 class="exercise-start">
  <b>Exercise</b>: Create FixtureComponent with @Input
</h4>

#### Step 1 - Replace current fixture template in Competition Fixtures

The initial structure for `Fixture` is already in place.

Open `TeamGames.vue`, comment out the `GridLayout` and then add `<Fixture :game="game" />` in its place.

You will notice that `Ficture` expects a `:game` attribute. This will be added in the next exercise.

<!-- > **HINT**: Make sure to keep the `GridLayout` commented out—you’ll need it momentarily. -->

<div class="solution-start"></div>

The template in `TeamGames.vue` should look like this:

``` XML
<ListView for="game in games">
     <v-template>
         <Fixture :game="game" />
     </v-template>
 </ListView>
 ```

<div class="solution-end"></div>

Now if you reload the app and go to `View Fixtures` you should get something like this:

![Fixtures](images/warmup-custom-fixtures.png?raw=true)

#### Step 2 - Update FixtureComponent and add props for fixture

Head to `Fixture.vue`.

What we need is to turn the `fixture` into an `@Input` type attribute.

Refer to the solution below if you get stuck.

<div class="solution-start"></div>

`Fixture.vue` should look like this:

``` javascript
data()          {
    return {
    };
},
props:          {
    game:           Object
},
```
<div class="solution-end"></div>

#### Step 3 - Update HTML

Update all the `Labels` so that they display the data from the game attribute. Make sure you take care of `homeTeamName`, `guestTeamName`.

<div class="solution-start"></div>

``` XML
<GridLayout rows="auto" columns="*, auto, *" class="list-group-item">
    <Label col="0" :text="game.Team1.TeamName" class="h4 text-right"></Label>

    <StackLayout col="1"  horizontalAlignment="center">

        <StackLayout orientation="horizontal">
            <Label :text="game.MatchResults[0].PointsTeam1" class="score m-r-5"></Label>
            <Label :text="game.MatchResults[0].PointsTeam2" class="score"></Label>
        </StackLayout>

    </StackLayout>

    <Label col="2" :text="game.Team2.TeamName" class="h4 text-left"></Label>
</GridLayout>
```

<div class="solution-end"></div>

Reload the app. Now the fixtures should be displayed correctly again.
<div class="exercise-end"></div>


### Components with events

Adding a event to a component is easy. Let's have a look at `LeagueTableComponent` as an example.

To make it work we need first to create an `EventBus`:

<div class="solution-start"></div>

``` javascript
// event-bus.js
import Vue from 'vue';

const EventBus = new Vue();

export default EventBus;
```

<div class="solution-end"></div>

Then every time we want to trigger the event, we can call `$emit(value)` on `EventBus`. Just like this:

``` javascript
import EventBus                     from '../../helpers/EventBus';
...
selectGame() {
    EventBus.$emit( 'selectGame', this.game );
}
```

Obviously there must be something that actually triggers `onTeamSelect`. In this case this is done by the `<ListView>`

``` XML
<GridLayout rows="auto" columns="*, auto, *" class="list-group-item" @tap="selectGame()">
```

### Exercise: Creating a presentation component with EventBus

In this exercise we need to update the app, so that if the user taps on a game in the fixture table, the app should display  game details in `TeamGames`.

<h4 class="exercise-start">
  <b>Exercise</b>: Update LeagueTableComponent with @Output
</h4>

#### Step 1 - Add EventBus

Import the `EventBus` in `TeamGames` and `Ficture`.

<div class="solution-start"></div>
``` javascript
import EventBus                     from '../../helpers/EventBus';
```
<div class="solution-end"></div>

#### Step 2 - Emit value

Update the `selectGame` function, so that it `emits` the `selectGame` event.

<div class="solution-start"></div>

``` javascript
selectGame() {
    EventBus.$emit( 'selectGame', this.game );
}
```

<div class="solution-end"></div>

#### Step 3 - Call OnTeamSelect from the UI

Now we need the `GridLayout` in `Fixture.vue` to call `selectGame` whenever the user taps on one of the teams.

<div class="solution-start"></div>

``` XML
<GridLayout rows="auto" columns="*, auto, *" class="list-group-item" @tap="selectGame()">
```

<div class="solution-end"></div>

#### Step 4
Now the `Fixture` is ready to emit a `teamId` each time user taps on it. We just need to take it at `TeamGames`.

Add the listener in `beforeMount`:

``` javascript
// add listeners
EventBus.$on( 'selectGame',    this.showGame );
```

And integrate the function in `methods`:

<div class="solution-start"></div>
``` javascript
showGame( game ) {
    this.actGame    = game;
}
```
<div class="solution-end"></div>

#### Step 5

Test the app to see if this works.

Now upon tapping on a team in the table you should see a game view, which should display details for that given game.

<div class="exercise-end"></div>
