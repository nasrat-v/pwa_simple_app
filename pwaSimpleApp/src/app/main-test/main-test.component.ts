import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';@Component({
  selector: 'app-main',
  templateUrl: './main-test.component.html',
  styleUrls: ['./main-test.component.scss']
})
export class MainTestComponent implements OnInit {  query
  sub: any;
  dictionary: string;
  dicts: {};
  title = 'Longman Dictionary of Contemporary English (5th edition)';
  results: any[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute) {}  ngOnInit() {
    console.log('toto');
    this.query = {
      headword: '',
      relatedwords: '',
      synonyms: '',
      phrasalverbs: '',
      partsofspeech: '',
      images: '',
      audio: '',
      search: '',
    };this.dicts = {
      ldoce5: 'Longman Dictionary of Contemporary English (5th edition)',
      lasde: 'Longman Active Study Dictionary',
      ldec: 'Longman English-Chinese Dictionary of 100,000 Words (New 2nd Edition)',
      wordwise: 'Longman Wordwise Dictionary',
      laesd: 'Longman Afrikaans to English',
      leasd: 'Longman English to Afrikaans',
      laad3: 'Longman Advanced American Dictionary',
      laes: '  English to Latin American Spanish',
      lase: 'Latin American Spanish to English',
      brep: 'English to Brazilian Portuguese',
      brpe: 'Brazilian Portuguese to English'
    };this.sub = this.route.params.subscribe(params => {
      this.dictionary = params['dict'];
      if (this.dictionary) {
        this.title = this.dicts[this.dictionary];
      }
    });}ngOnDestroy() {
    this.sub.unsubscribe();
  }getWords() {
    let params = new URLSearchParams();
    params.set('headword', this.query.headword);
    if (this.query.relatedwords) {
      params.set('related_words', this.query.relatedwords);
    }
    if (this.query.synonyms) {
      params.set('synonyms', this.query.synonyms);
    }
    if (this.query.phrasalvebs) {
      params.set('phrasal_verbs', this.query.phrasalvebs);
    }
    if (this.query.partsofspeech) {
      params.set('part_of_speech', this.query.partsofspeech);
    }
    if (this.query.images) {
      params.set('images', this.query.images);
    }
    if (this.query.audio) {
      params.set('audio', this.query.audio);
    }
    if (this.query.search) {
      params.set('search', this.query.search);
    }
    let dict = (this.dictionary) ? this.dictionary : '';this.http.get(`https://api.pearson.com/v2/dictionaries/${dict}/entries?${params.toString()}`)
      .subscribe(
        dictresults => {
          this.results = (dictresults as any).results;
        },
        error => console.log(error)
      )
  }}