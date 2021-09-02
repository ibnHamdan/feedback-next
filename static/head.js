dangerouslySetInnerHTML={{
  __html: `
 if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
   window.location.href = "/dashboard"
 }
`
}}