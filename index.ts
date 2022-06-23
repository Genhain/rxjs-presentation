import './style.css';

import { of, map, Observable, from, fromEvent } from 'rxjs';
import { pluck, delay, switchMap, tap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { beers } from './beers';
import { debounce } from 'lodash';

let searchField = document.getElementById("search-input")
let list = document.getElementById("myList")
let searchFieldInput$ = fromEvent(searchField, 'input').pipe(pluck("target", "value"))

const beers$ = (searchTerm:string) => of(beers).pipe(
  map(beers => { 
    return beers.filter(beer => { 
      return beer.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }),
  delay(2000)
)

searchFieldInput$.pipe(
  debounceTime(1000),
  distinctUntilChanged(),
  tap(() => { list.innerHTML = '' }),
  switchMap(beers$)
)
.subscribe(val => {
  val.forEach( beer => {
    let li = document.createElement("li");
    li.innerText = beer;
    list.appendChild(li);
  })
})

type MyHandler = (message: string) => void

const debounce = (
  term: string,
  time: number, 
  callback: MyHandler
  ) => {
setTimeout(() => {
  callback(term)
}, time)
}

// Open the console in the bottom right to see results.
