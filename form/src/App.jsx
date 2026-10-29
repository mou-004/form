import { useState } from 'react';
import { validate } from './validation.js';
import './App.css';
const initial = {name:'',email:'',phone:'',password:'',course:'',birthDate:''};
const fields = [
  ['name','Full name','text','Your full name','name'],
  ['email','Email address','email','you@example.com','email'],
  ['phone','Phone number','tel','01712345678','tel'],
  ['password','Password','password','Letters and numbers, 8+ characters','new-password'],
];
export default function App() {
  const [values,setValues] = useState(initial);
  const [file,setFile] = useState(null);
  const [errors,setErrors] = useState({});
  const [loading,setLoading] = useState(false);
  const [banner,setBanner] = useState(null);
  function change(event) {
    const {name,value} = event.target;
    setValues(old=>({...old,[name]:value}));
    setErrors(old=>({...old,[name]:''})); setBanner(null);
  }
  function props(name) {
    return {id:name,name,value:values[name],onChange:change,required:true,
      'aria-invalid':Boolean(errors[name]),'aria-describedby':errors[name]?name+'-error':undefined};
  }
  function error(name) { return errors[name] && <span className="field-error" id={name+'-error'}>{errors[name]}</span>; }
  async function submit(event) {
    event.preventDefault(); if(loading) return;
    const form = event.currentTarget;
    const next = validate(values,file); setErrors(next); setBanner(null);
    if(Object.keys(next).length) {
      setBanner({type:'error',message:'Please correct the highlighted fields.'});
      form.elements.namedItem(Object.keys(next)[0])?.focus(); return;
    }
    setLoading(true);
    try {
      // Demo only: replace this delay with a fetch request to your backend.
      await new Promise(resolve=>setTimeout(resolve,1500));
      if(values.email.trim().toLowerCase()==='error@example.com') throw new Error('Submission failed. Please try again.');
      setBanner({type:'success',message:'Demo submission successful! Your details have been validated.'});
      setValues(initial); setFile(null); form.reset();
    } catch(err) { setBanner({type:'error',message:err.message || 'Something went wrong. Please try again.'}); }
    finally { setLoading(false); }
  }
  return <main className="page"><div className="experience">
    <aside className="showcase">
      <a className="brand" href="#registration"><span className="brand-mark">N</span> NEXT<span className="brand-light">ACADEMY</span></a>
      <div className="showcase-copy"><span className="pill"><i/> YOUR NEXT CHAPTER STARTS HERE</span>
      <h2>Big ideas.<br/>Bold moves.<br/><span>A better you.</span></h2>
      <p>From your first line of code to your next creative breakthrough. Make room for what comes next.</p></div>
      <img className="hero-art" src="/learning-art.svg" alt="Illustration of a coding workspace with a graduation cap and a completed task"/>
      <div className="feature-row"><div><span className="feature-icon">01</span><strong>Choose your path</strong><small>Four courses to explore</small></div><div><span className="feature-icon">02</span><strong>Take the first step</strong><small>Start with your profile</small></div></div>
      <div className="side-footer"><span className="tiny-logo">✦</span> A little curiosity goes a long way.</div>
    </aside>
    <section className="card" id="registration">
    <header><span className="eyebrow">START YOUR JOURNEY</span><h1>Create your <span>account.</span></h1><p>Enter your details below. All fields are required.</p></header>
    {banner && <div className={'banner '+banner.type} role={banner.type==='error'?'alert':'status'}>{banner.message}</div>}
    <form onSubmit={submit} noValidate aria-busy={loading}><fieldset disabled={loading}><div className="grid">
      {fields.map(([name,label,type,placeholder,autoComplete])=><div className="field" key={name}><label htmlFor={name}>{label}</label><input {...props(name)} type={type} placeholder={placeholder} autoComplete={autoComplete}/>{error(name)}</div>)}
      <div className="field"><label htmlFor="course">Select course</label><select {...props('course')}><option value="">Choose a course</option><option value="web">Web Development</option><option value="design">UI/UX Design</option><option value="python">Python Programming</option><option value="ielts">IELTS Preparation</option></select>{error('course')}</div>
      <div className="field"><label htmlFor="birthDate">Date of birth</label><input {...props('birthDate')} type="date"/>{error('birthDate')}</div>
      <div className="field full"><label htmlFor="image">Profile image</label><div className="upload"><input id="image" name="image" type="file" required accept="image/jpeg,image/png,image/webp" aria-invalid={Boolean(errors.image)} aria-describedby={errors.image?'image-help image-error':'image-help'} onChange={event=>{setFile(event.target.files?.[0]||null);setErrors(old=>({...old,image:''}));setBanner(null);}}/><small id="image-help">JPG, PNG or WebP · Maximum 2 MB</small></div>{error('image')}</div>
    </div><button type="submit" disabled={loading}>{loading?<><span className="spinner" aria-hidden="true"/>Submitting...</>:'Create account →'}</button></fieldset></form>
    <p className="foot">Demo form · Information is not saved to a server.</p>
  </section></div></main>;
}
