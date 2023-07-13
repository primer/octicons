#!/usr/bin/env node

const octicons = require('../../build/data.json')
const {default: generate} = require('@babel/generator')
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../src/__generated__')
const iconsFile = join(srcDir, 'icons.ts')

const GENERATED_HEADER = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */'

function pascalCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

const icons = Object.entries(octicons)
  .map(([key, octicon]) => {
    const name = `${pascalCase(key)}Icon`
    // Build an object with the following structure:
    //
    // type SVGData = {
    //   [key in string]: {
    //     width: number,
    //     path: React.JSXElement
    //   },
    // }
    //
    const svgData = t.objectExpression(
      Object.entries(octicon.heights).map(([height, icon]) => {
        return t.objectProperty(
          t.stringLiteral(height),
          t.objectExpression([
            t.objectProperty(t.stringLiteral('width'), t.numericLiteral(icon.width)),
            t.objectProperty(t.stringLiteral('path'), svgToJSX(icon.ast))
          ])
        )
      })
    )

    const code = `
    @Component({
      selector: 'svg[op-octicon-${key}]',
      template: \`
        <title *ngIf="title">{{title}}</title>

        ${Object.entries(octicon.heights).map(([height, icon]) => `
        <ng-container *ngIf="height === ${height}">${icon.ast}</ng-container
        `)}
      \`,
    })
    export class Op${name} {
      @Input() className = '';
      @Input() fill = 'currentColor';
      @Input() size: 'small'|'medium'|'large'= 'medium';
      @Input() verticalAlign = 'text-bottom';
      @Input() title = '';

      @HostBinding('attr.role') role = 'img';
      @HostBinding('attr.id') @Input() id = '';
      @HostBinding('attr.tabindex') @Input() tabindex:number;
      @HostBinding('attr.aria-label') @Input('aria-label') ariaLabel = '';
      @HostBinding('attr.aria-labelledby') @Input('aria-labelledby') arialabelledby = '';

      @HostBinding('class.op-octicon') baseClassName = true;
      @HostBinding('attr.aria-hidden') get ariaHidden() {
        return !this.ariaLabel;
      }
      @HostBinding('attr.focusable') get focusable() {
        return this.tabindex >= 0;
      }
      @HostBinding('style') get style () {
        return {
          display: 'inline-block',
          'user-select': 'none',
          'vertical-align', this.verticalAlign,
          overflow: 'visible'
        };
      };
      @HostBinding('attr.viewBox') get viewBox() {
        const naturalHeight = closestNaturalHeight(heights, height)
        const naturalWidth = svgDataByHeight[naturalHeight].width
        return \`0 0 \${naturalWidth} \${naturalHeight}\`;
      }

      get SVGData() {
        ${generate(t.returnStatement(svgData))}
      }

      get height() {
        const sizeMap = {
          small: 16,
          medium: 32,
          large: 64
        }
        return sizeMap[this.size];
      }
    }
    `;

    return {
      key,
      name,
      octicon,
      code
    }
  })
  .sort((a, b) => a.key.localeCompare(b.key))

function writeIconExport(file) {
  const count = icons.length
  const code = `${GENERATED_HEADER}
import {
  Component,
  Input,
  HostBinding
} from '@angular/core';
import { closestNaturalHeight } from '../helpers';

${icons.map(({code}) => code).join('\n')}
`
  return fse.writeFile(file, code, 'utf8').then(() => {
    console.warn('wrote %s with %d exports', file, count)
    return icons
  })
}

fse
  .mkdirs(srcDir)
  .then(() => writeIconExport(iconsFile))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
