import React from 'react'
import './css/footer.css'

const Footer = () => {
  return (
    <div>
      <div className='footer'>
        <div className='sb_footer section_padding'>
          <div className='sb_footer-links'>
            <div className='sb_footer-links_div'>
              <h4>For bussiness</h4>
              <a><p>mamama</p></a>
              <a><p>mamama</p></a>
              <a><p>mamama</p></a>
              <a><p>mamama</p></a>
              <a><p>mamama</p></a>
            </div>

            <div className='sb_footer-links_div'>
              <h4>For bussiness</h4>
              <a><p>mamama</p></a>
              <a><p>mamama</p></a>
              <a><p>mamama</p></a>
              <a><p>mamama</p></a>
              <a><p>mamama</p></a>
            </div>

            <div className='sb_footer-links_div'>
              <h4>For bussiness</h4>

              <a><p>mamama</p></a>
              <a><p>mamama</p></a>
              <a><p>mamama</p></a>
              <a><p>mamama</p></a>
              <a><p>mamama</p></a>
            </div>

            <div className='sb_footer-links_div'>
              <h4>Social media</h4>
              <div className='social-media'>
                <a><p>mamama</p></a>
                <a><p>mamama</p></a>
                <a><p>mamama</p></a>
                <a><p>mamama</p></a>
              </div>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className='sb_footer-below'>
          <div className='sb_footer-copyright'>
            <p>
              @{new Date().getFullYear} CodeInn. All right reserved.
            </p>
          </div>
          <div className='sb_footer-below-links'>
            <a><div><p>Terms & conditions</p></div></a>
            <a><div><p>Privacy</p></div></a>
            <a><div><p>Security</p></div></a>
            <a><div><p>Cookie declaration</p></div></a>

          </div>
        </div>
      </div>
    </div>

  )
}
export default Footer; 
