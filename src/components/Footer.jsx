export default function Footer() {
  return (
    <footer>
      <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
        <div>© {new Date().getFullYear()} Emircan Tutar</div>
        <div className="muted">Built with React • Dark Theme</div>
      </div>
    </footer>
  )
}
