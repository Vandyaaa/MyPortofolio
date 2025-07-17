
import '../styles/aboutme.css';
import AnimatedContent from './AnimatedContent';
import sya from '../assets/eek.jpg';
import FadeContent from './FadeContent';
import CircularText from './CircularText';
function Biodata() {
    var ya = document.getElementById('inp');

        // Fungsi untuk memantau posisi scroll
        // window.onscroll = function() {
        //     if (ya.scrollTop > 400 || document.documentElement.scrollTop > 650) {
        //         ya.style.filter = "grayscale(100%) brightness(20%)"; 
                
        //     } else {
        //         ya.style.filter = "grayscale(0%)"; 
        //     }
        // };
    return (
        

            <FadeContent className='con-sticky' blur={false} duration={1500} easing="ease-out" initialOpacity={0}>
            
                <div className='sticky'>
                <svg className='con-star con-star4' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <path class="star star4" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
                </svg>

                
                        
                        <div className='sticky-header'>
                            <AnimatedContent
                                distance={0}
                                direction="horizontal"
                                reverse={true}
                                config={{ tension: 80, friction: 20 }}
                                initialOpacity={0}
                                animateOpacity
                                scale={0}
                                threshold={0.2}
                            >
                                <div className='con-image-bio'>
                                </div>
                            </AnimatedContent>
                            <AnimatedContent
                                distance={70}
                                direction="horizontal"
                                reverse={false}
                                config={{ tension: 80, friction: 20 }}
                                initialOpacity={0.2}
                                animateOpacity
                                scale={0.7}
                                threshold={0.2}
                            >
                                <h1 id='namamu'>— Firdhan Abivandya.</h1>
                            </AnimatedContent>
                            
                        </div>
                        
                        <div className='bio' id='bio'>
                            <h1><span></span>Information</h1>
                            <ul className='list-bio'>
                                <li>
                                    <div className='text-bio'><i class="fi fi-rs-cake-birthday"></i><p>21 June 2007</p></div>
                                </li>
                                <li>
                                    <div className='text-bio'><i class="fi fi-rs-thumbtack"></i><p>Surakarta, Centar Java</p></div>
                                </li>
                                <li>
                                    <div className='text-bio'><i class="fi fi-rs-envelope"></i><p>abivandyafirdhan@gmail.com</p></div>
                                </li>
                                <li>
                                    <div className='text-bio'><i class="fi fi-rs-phone-rotary"></i><p>+62 877-3977-0494</p></div>
                                </li>

                            </ul>
                            <h1><span></span>Skills</h1>
                            <div className='skills'>
                                
                                <div className='box-skill'>HTML</div>
                                <div className='box-skill'>CSS</div>
                                <div className='box-skill'>JAVA SCRIPT</div>
                                <div className='box-skill'>PHP</div>
                                <div className='box-skill'>REACT</div>
                                <div className='box-skill'>MYSQL</div>
                                <div className='box-skill'>JAVA</div>
                                <div className='box-skill'>BOOTSTRAP</div>
                                <div className='box-skill'>TAILWIND</div>
                                <div className='box-skill'>FIGMA</div>
                                <div className='box-skill'>XML</div>
                                <div className='box-skill'>UI / UX DESIGN</div>
                            </div>
                        </div>

                        <div className='con-hire-me'>
                            <a href='https://wa.me/087739770494' className='contactme'><p>Contact Me</p></a>
                            
                        </div>
                
                </div>
            </FadeContent >
    )
    
}

export default Biodata;