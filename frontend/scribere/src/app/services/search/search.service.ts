import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "../../model/article.model";

@Injectable({
  providedIn: "root",
})
export abstract class SearchService {
  abstract getSearchResults(query: string): Observable<Article[]>;
}
