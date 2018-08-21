// RxJS v6+
import { of, interval, fromEvent } from 'rxjs';
import { switchMap, first, debounceTime } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const input = document.getElementById('input-id')
const source1 = fromEvent(input,'keyup');

source1.pipe(
  debounceTime(1000),
  switchMap( term => ajax(`https://api.github.com/search/users?q=${term.target.getValue}`)),
).subscribe(
  val=>{
    var ul = document.getElementById('output');
    val.response.items.forEach( (elem: any) => {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(elem.login));
      ul.appendChild(li);
    }
    )
  }
)
