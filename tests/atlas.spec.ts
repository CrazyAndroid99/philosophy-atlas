import { test, expect } from '@playwright/test';
import { nodes, relationships } from '../lib/demo-data';
test('demo data has valid endpoints, references and initial size',()=>{
 expect(nodes.filter(n=>n.initial)).toHaveLength(15);
 expect(new Set(nodes.map(n=>n.id)).size).toBe(nodes.length);
 expect(new Set(relationships.map(e=>e.id)).size).toBe(relationships.length);
 for(const e of relationships){expect(nodes.some(n=>n.id===e.source)).toBeTruthy();expect(nodes.some(n=>n.id===e.target)).toBeTruthy();expect(e.explanation.length).toBeGreaterThan(20);if(e.evidence==='sourced')expect(e.sources.length).toBeGreaterThan(0);for(const s of e.sources)expect(new URL(s.url).protocol).toBe('https:');}
});
test('search, expansion, comparison sources and filters',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.getByText('15 nodes · 17 connections')).toBeVisible();
 await page.getByLabel('Find an idea or thinker').fill('Spinoza');
 await page.locator('.node-list').getByRole('button',{name:/Baruch Spinoza/}).click();
 await expect(page.getByRole('heading',{name:'Baruch Spinoza',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Expand connections (+2)'}).click();await expect(page.getByText('17 nodes · 19 connections')).toBeVisible();
 await page.locator('.connections').getByRole('button',{name:/Jean-Paul Sartre/}).click();
 await expect(page.getByText('INFERRED',{exact:true})).toBeVisible();await expect(page.getByText(/not a claim of historical influence/)).toBeVisible();await expect(page.locator('.source')).toHaveCount(2);
 await page.getByLabel('Philosophers',{exact:true}).uncheck();await expect(page.getByText('13 nodes · 0 connections')).toBeVisible();
 await page.getByLabel('Philosophers',{exact:true}).check();await page.getByRole('button',{name:'Reset view'}).click();
 await page.getByRole('button',{name:'Zoom in'}).click();await page.getByRole('button',{name:'Zoom out'}).click();
 await page.getByLabel('Find an idea or thinker').fill('nothingmatches');await expect(page.getByText(/No matches/)).toBeVisible();
 expect(errors).toEqual([]);
});
test('mobile fits viewport and exposes details',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await page.locator('.node-list').getByRole('button',{name:/Jean-Paul Sartre/}).click();await expect(page.getByRole('heading',{name:'Jean-Paul Sartre',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
 await page.screenshot({path:'test-results/mobile.png',fullPage:true});
});
test('desktop preview',async({page})=>{await page.setViewportSize({width:1440,height:1000});await page.goto('/');await expect(page.locator('.graph canvas').first()).toBeVisible();await page.waitForTimeout(500);await page.screenshot({path:'test-results/desktop.png',fullPage:true});});

// Read Cytoscape geometry only to aim real pointer events at its canvas.
// _cyreg is an internal registry: keep this adapter confined to this test.
test('canvas selection, wheel zoom, panning and reset',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');
 await expect(page.locator('.graph canvas').first()).toBeVisible();
 const geometry = () => page.locator('.graph').evaluate(el=>{
  const cy = (el as HTMLElement & {_cyreg:{cy:import('cytoscape').Core}})._cyreg.cy;
  return {node:cy.getElementById('spinoza').renderedPosition(),edge:cy.getElementById('spinoza-sartre').renderedMidpoint(),zoom:cy.zoom(),pan:cy.pan()};
 });
 const box=(await page.locator('.graph').boundingBox())!;
 const before=await geometry();
 await page.mouse.click(box.x+before.node.x,box.y+before.node.y);
 await expect(page.getByRole('heading',{name:'Baruch Spinoza',exact:true})).toBeVisible();
 await page.mouse.click(box.x+before.edge.x,box.y+before.edge.y);
 await expect(page.getByText('INFERRED',{exact:true})).toBeVisible();
 await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.wheel(0,-180);
 await expect.poll(async()=>(await geometry()).zoom).toBeGreaterThan(before.zoom);
 const zoomed=await geometry();
 await page.mouse.move(box.x+30,box.y+30);await page.mouse.down();await page.mouse.move(box.x+100,box.y+65,{steps:8});await page.mouse.up();
 await expect.poll(async()=>(await geometry()).pan.x).not.toBe(zoomed.pan.x);
 await page.getByRole('button',{name:'Reset view'}).click();
 await expect.poll(async()=>(await geometry()).zoom).toBeCloseTo(before.zoom,2);
});
