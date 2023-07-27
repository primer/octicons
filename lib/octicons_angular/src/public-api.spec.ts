import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  PlusIconComponent,
  plusIconData,
  OpAddIconComponent,
  opAddIconData,
  LogIconComponent,
  logIconData,

  toDOMString,
} from './public-api';

describe('Github native icon', () => {
  let component: PlusIconComponent;
  let fixture: ComponentFixture<PlusIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [PlusIconComponent]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render the svg', () => {
    const iconElement: HTMLElement = fixture.nativeElement;
    expect(iconElement.children[0].tagName.toLowerCase()).toEqual('path');
    expect(iconElement.children[0].getAttribute('d')).toBeTruthy();
  });

  it('should render the title', () => {
    const iconElement: HTMLElement = fixture.nativeElement;
    expect(iconElement.children[0].tagName.toLowerCase()).toEqual('path');

    component.title = 'Some title';
    fixture.detectChanges();

    expect(iconElement.children[0].tagName.toLowerCase()).toEqual('title');
    expect(iconElement.children[1].tagName.toLowerCase()).toEqual('path');
    expect(iconElement.children[1].getAttribute('d')).toBeTruthy();
  });

  it('should export the SVG data', () => {
    expect(plusIconData).toBeDefined();
    expect(plusIconData['24']).toBeDefined();
    expect(plusIconData['24'].paths.length).toEqual(1);
  });
});

describe('OpenProject extension icon', () => {
  let component: OpAddIconComponent;
  let fixture: ComponentFixture<OpAddIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [OpAddIconComponent]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpAddIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render the svg', () => {
    const iconElement: HTMLElement = fixture.nativeElement;
    expect(iconElement.children[0].tagName.toLowerCase()).toEqual('path');
    expect(iconElement.children[0].getAttribute('d')).toBeTruthy();
  });

  it('should export the SVG data', () => {
    expect(opAddIconData).toBeDefined();
    expect(opAddIconData['24']).toBeDefined();
    expect(opAddIconData['24'].paths.length).toEqual(1);
  });
});

describe('Icon with multiple paths', () => {
  let component: LogIconComponent;
  let fixture: ComponentFixture<LogIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [LogIconComponent]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render the svg with all paths', () => {
    const iconElement: HTMLElement = fixture.nativeElement;
    expect(iconElement.children[0].tagName.toLowerCase()).toEqual('path');
    expect(iconElement.children[0].getAttribute('d')).toBeTruthy();
    expect(iconElement.children[1].tagName.toLowerCase()).toEqual('path');
    expect(iconElement.children[1].getAttribute('d')).toBeTruthy();
  });

  it('should export the SVG data', () => {
    expect(logIconData).toBeDefined();
    expect(logIconData['24']).toBeDefined();
    expect(logIconData['24'].paths.length).toEqual(2);
  });
});


describe('rendering without Angular', () => {
  it('should render the SVG', () => {
    const rendered = toDOMString(logIconData);
    expect(rendered).toContain('<svg');
    expect(rendered).toContain(`<path d="${logIconData[24].paths[0]}"></path>`);
    expect(rendered).toContain('</svg>');
  });

  it('should render the small SVG', () => {
    const rendered = toDOMString(logIconData, 'small');
    expect(rendered).toContain('<svg');
    expect(rendered).toContain(`<path d="${logIconData[16].paths[0]}"></path>`);
    expect(rendered).toContain('</svg>');
  });

  it('should render the SVG attributes', () => {
    const rendered = toDOMString(logIconData, 'medium', { extra: '1' });
    expect(rendered).toContain('<svg');
    expect(rendered).toContain('extra="1"');
    expect(rendered).toContain(`<path d="${logIconData[24].paths[0]}"></path>`);
    expect(rendered).toContain('</svg>');
  });
});
