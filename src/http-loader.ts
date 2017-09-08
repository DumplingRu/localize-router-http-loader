import { LocalizeParser, LocalizeRouterSettings } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { Location } from '@angular/common';

/**
 * Config interface
 */
export interface ILocalizeRouterParserConfig {
  locales: Array<string>;
  prefix?: string;
}

export class LocalizeRouterHttpLoader extends LocalizeParser {
  /**
   * CTOR
   * @param translate
   * @param location
   * @param settings
   * @param http
   * @param path
   */
  constructor(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, private http: HttpClient, private path: string = 'assets/locales.json') {
    super(translate, location, settings);
  }

  /**
   * Initialize or append routes
   * @param routes
   * @returns {Promise<any>}
   */
  load(routes: Routes): Promise<any> {
    return new Promise((resolve: any) => {
      this.http.get(`${this.path}`)
        .subscribe((data: ILocalizeRouterParserConfig) => {
          this.locales = data.locales;
          this.prefix = data.prefix || '';
          this.init(routes).then(resolve);
        });
    });
  }
}
