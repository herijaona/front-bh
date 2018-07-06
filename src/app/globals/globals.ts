import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  public static localStorageString = {
    DATAROLE: '_data_role_',
    TOKEN: 'bh-token',
  };

  /**
   * Base URL
   */
  base_href = '/';
  api_baseUrl = 'http://localhost:3000';
  site_baseUrl = 'http://localhost:4546';
  // base_href: string = "/bh_version/";
  // api_baseUrl: string = "http://54.36.98.91:3000";
  // site_baseUrl: string = "http://54.36.98.91/bh_version";

  urlArrayLeng: 6;
  private conf0_editor = {
    removePlugins: 'toolbar,elementspath',
    resize_enabled: false,
    height: 200,
  };
  public conf_editor = {
    removePlugins: 'elementspath',
    toolbar: [
      {
        name: 'basicstyles',
        groups: ['basicstyles', 'cleanup'],
        items: [
          'Bold',
          'Italic',
          'Underline',
          'Strike',
          'Subscript',
          'Superscript',
          '-',
          'CopyFormatting',
          'RemoveFormat',
        ],
      },
      {
        name: 'paragraph',
        groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
        items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'],
      },
      { name: 'links', items: ['Link', 'Unlink'] },
      {
        name: 'insert',
        items: ['HorizontalRule', 'Smiley', 'SpecialChar'],
      },
      { name: 'styles', items: ['Styles', 'Format'] },
      { name: 'colors', items: ['TextColor', 'BGColor'] },
    ],
  };

  private collab_types: any = [
    {
      slug: 'COLLABSUBJINNOV',
      text: 'Suggestions',
      type: 2,
    },
    {
      slug: 'COLLABPROJINNOV',
      text: 'Project',
      type: 1,
    },
    {
      slug: 'COLLABINCUB',
      text: 'Incubation',
      type: 3,
    },
    {
      slug: 'COLLABINVEST',
      text: 'Investment',
      type: 4,
    },
  ];
  public getConfig(arg) {
    return this[arg];
  }

  getCollabtypetext(sl) {
    const AllTyp = this.getConfig('collab_types');
    for (const clt of AllTyp) {
      if (clt.slug === sl) {
        return clt.text;
      }
    }
    return '';
  }
}
