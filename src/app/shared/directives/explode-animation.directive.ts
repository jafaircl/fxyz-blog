import { Directive, Renderer2, Input, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition, query, AnimationBuilder, AnimationPlayer } from '@angular/animations';

@Directive({
  selector: '[explodeAnimation]'
})
export class ExplodeAnimationDirective {

  protected static SInit = (() => {
    ExplodeAnimationDirective.prototype.animationTimer = 0;
    ExplodeAnimationDirective.prototype.offsetX = 0;
    ExplodeAnimationDirective.prototype.offsetY = 0;
    ExplodeAnimationDirective.prototype.aspectHeight = 100;
    ExplodeAnimationDirective.prototype.duration = 590;
    ExplodeAnimationDirective.prototype.curve = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  })();

  animationTimer: number;
  @Input() aspectHeight: number;
  @Input() curve: string;
  @Input() destination: string;
  @Input() duration: number;
  @Input() offsetX: number;
  @Input() offsetY: number;
  @Input() target: any;

  @HostListener('click', ['$event']) onClick($event) {
    this.animateRouteChange($event);
  }

  constructor(private router: Router,
              private renderer: Renderer2,
              private animationBuilder: AnimationBuilder,
              private element: ElementRef) { }

  animateRouteChange($event): void {
    // stop href from actually navigating before we can animate
    $event.preventDefault();
    $event.stopPropagation();
    const target = $event.currentTarget;
    const props = target.getBoundingClientRect();
    this.createAndInsertPlaceholder(target, props);
    this.fixTargetPositionAndStyle(target, props);
    // build animation & play it
    const animation = this.buildAnimation(target, props);
    animation.play();
    animation.onDone(() => {
      this.router.navigateByUrl(this.destination)
    });
  }

  createAndInsertPlaceholder(target, props) {
    const parentNode = this.renderer.parentNode(target);
    const placeholder = this.renderer.createElement(target.tagName);
    const targetStyle = `background-image: none !important;
                         box-shadow: none !important;
                         width: ${props.width}px;
                         height: ${props.height}px;
                         ${target.getAttribute('style')}`;
    this.renderer.setAttribute(placeholder, 'style', targetStyle);
    this.renderer.setAttribute(placeholder, 'class', target.className);
    this.renderer.insertBefore(parentNode, placeholder, target);
  }

  fixTargetPositionAndStyle(target, props) {
    const _style = {
      position: 'fixed',
      zIndex: 1,
      top: `${props.top + this.offsetY}px`,
      left: `${props.left - this.offsetX}px`,
      width: `${props.width}px`
    };
    for (const property in _style) {
      if (_style[property]) {
        this.renderer.setStyle(target, property, _style[property]);
      }
    }
  }

  buildAnimation(target, props): AnimationPlayer {
    console.log(props);
    console.log(window.innerWidth);
    const animation = this.animationBuilder.build([
      style({
        transform: `translate3d(0,0,0)`,
        width: `${props.width}px`,
        // height: `${props.height}px`
      }),
      animate(`${this.duration}ms ${this.curve}`, style({
        transform: `translate3d(${-1 * props.left}px, ${-1 * props.top}px,0)`,
        width: `${window.innerWidth}px`,
        // height: `${props.height}px`,

      })),
    ]);
    return animation.create(target);
  }
}
