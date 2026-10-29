import { validate, tomorrowISO } from './validation.js';
const form=document.querySelector('form'), banner=document.querySelector('#banner');
const ids=['name','email','phone','role','date','image','notes','consent'];
const touched=new Set();
const date=document.querySelector('#date');date.min=tomorrowISO();
function values(){return Object.fromEntries(ids.map(id=>{const el=form.elements[id];return[id,el.type==='checkbox'?el.checked:el.type==='file'?el.files[0]:el.value]}))}
function showError(id,message){const el=form.elements[id];document.getElementById(id+'-error').textContent=message||'';el.setAttribute('aria-invalid',message?'true':'false');el.setAttribute('aria-describedby',id+'-error')}
function check(id){showError(id,validate(values())[id])}
ids.forEach(id=>{const el=form.elements[id];el.addEventListener('blur',()=>{touched.add(id);check(id)});el.addEventListener('input',()=>{if(touched.has(id))check(id);if(!banner.hidden)banner.hidden=true});el.addEventListener('change',()=>{touched.add(id);check(id)})});
form.elements.notes.addEventListener('input',e=>document.querySelector('.counter').textContent=`${e.target.value.length} / 500`);
let previewUrl;
form.elements.image.addEventListener('change',()=>{const image=form.elements.image.files[0],preview=document.querySelector('#preview');if(previewUrl)URL.revokeObjectURL(previewUrl);preview.hidden=true;if(image&&!validate(values()).image){previewUrl=URL.createObjectURL(image);preview.src=previewUrl;preview.hidden=false}});
function feedback(kind,message){banner.dataset.kind=kind;banner.setAttribute('role',kind==='error'?'alert':'status');banner.textContent=message;banner.hidden=false;banner.focus()}
// Replace this demo adapter with fetch('/api/registrations', {method:'POST',body:new FormData(form)})
// when a real API is available. No personal data leaves the browser in demo mode.
async function submitDemo(){await new Promise(resolve=>setTimeout(resolve,1400));if(document.querySelector('#response').value==='error')throw Error('We couldn’t submit your registration. Please try again. Your details are still here.');return {ok:true}}
form.addEventListener('submit',async e=>{e.preventDefault();if(form.getAttribute('aria-busy')==='true')return;const errors=validate(values());ids.forEach(id=>{touched.add(id);showError(id,errors[id])});if(Object.keys(errors).length){feedback('error','Please check the highlighted fields below.');form.elements[Object.keys(errors)[0]].focus();return}const button=form.querySelector('button');button.disabled=true;form.setAttribute('aria-busy','true');document.querySelector('.spinner').hidden=false;document.querySelector('#button-text').textContent='Saving your seat…';try{await submitDemo();feedback('success','Demo registration successful! You’ve completed the form. This is a preview; no seat has been booked and no data was sent.')}catch(error){feedback('error',error.message)}finally{button.disabled=false;form.setAttribute('aria-busy','false');document.querySelector('.spinner').hidden=true;document.querySelector('#button-text').textContent='Save my seat'}});
