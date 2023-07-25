import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  OpPlusIcon,
  OpOpAddIcon,
  OpLogIcon,
} from './public-api';

describe('Github native icon', () => {
  let component: OpPlusIcon;
  let fixture: ComponentFixture<OpPlusIcon>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [OpPlusIcon]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpPlusIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render the svg', () => {
    const iconElement: HTMLElement = fixture.nativeElement;
    expect(iconElement.children[0].tagName.toLowerCase()).toEqual("path");
    expect(iconElement.children[0].getAttribute('d')).toBeTruthy();
  });
});

describe('OpenProject extension icon', () => {
  let component: OpOpAddIcon;
  let fixture: ComponentFixture<OpOpAddIcon>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [OpOpAddIcon]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpOpAddIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render the svg', () => {
    const iconElement: HTMLElement = fixture.nativeElement;
    expect(iconElement.children[0].tagName.toLowerCase()).toEqual("path");
    expect(iconElement.children[0].getAttribute('d')).toBeTruthy();
  });

  it('should render the title', () => {
    const iconElement: HTMLElement = fixture.nativeElement;
    expect(iconElement.children[0].tagName.toLowerCase()).toEqual("path");

    component.title = "Some title";
    fixture.detectChanges();

    expect(iconElement.children[0].tagName.toLowerCase()).toEqual("title");
    expect(iconElement.children[1].tagName.toLowerCase()).toEqual("path");
    expect(iconElement.children[1].getAttribute('d')).toBeTruthy();
  });
});

describe('Icon with multiple paths', () => {
  let component: OpLogIcon;
  let fixture: ComponentFixture<OpLogIcon>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [OpLogIcon]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpLogIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render the svg with all paths', () => {
    const iconElement: HTMLElement = fixture.nativeElement;
    expect(iconElement.children[0].tagName.toLowerCase()).toEqual("path");
    expect(iconElement.children[0].getAttribute('d')).toBeTruthy();
    expect(iconElement.children[1].tagName.toLowerCase()).toEqual("path");
    expect(iconElement.children[1].getAttribute('d')).toBeTruthy();
  });
});

