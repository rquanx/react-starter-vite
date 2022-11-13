import React, { useState, useRef, useEffect } from "react";
import { drawOutline } from "./draw";
import * as PIXI from 'pixi.js';
import { Container, Graphics, Sprite } from "pixi.js";
export const App = () => {
  const appRef = useRef<PIXI.Application>();
  const graphRef = useRef<PIXI.Graphics>();
  useEffect(() => {
    const app = new PIXI.Application({

      transparent: true
    });
    document.body.appendChild(app.view);

    // create a new Sprite from an image path
    const bunny = PIXI.Sprite.from('https://fastly.jsdelivr.net/gh/rquanx/my-statics@master/images/1668243795685crop_11-removebg-preview.png');

    // center the sprite's anchor point
    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
    var c = new PIXI.Container()
    c.addChild(bunny);
    app.stage.addChild(c);
    const graph = new Graphics();
    app.stage.addChild(graph);
    appRef.current = app;
    graphRef.current = graph;

  }, [])

  const [v, setV] = useState(1)
  const draw = (v: number) => {
    const app = appRef.current;
    const graph = graphRef.current;
    const extra = app.renderer.plugins.extract as PIXI.Extract;
    const canvas = extra.canvas(app.stage.children[0]);
    const sprite = (app.stage.children[0] as Container).children[0] as Sprite
    drawOutline(canvas, sprite, graph, {
      thickness: v,
      color: 0xff9900
    })
  }

  return (
    <div>
      <h1>hello world</h1>
      <input type={'range'} max={100} min={1} value={v} onChange={(e) => {
        setV(parseInt(e.target.value))
        draw(parseInt(e.target.value));
      }} />
    </div>
  )
}