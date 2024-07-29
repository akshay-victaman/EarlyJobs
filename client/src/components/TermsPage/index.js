import React, { useEffect } from 'react';

const TermsPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'Terms & Conditions | EarlyJobs'
    }, [])

    return (
        <div className="privacy-policy-page">
            <div className="privacy-policy-page__background">
                <h1 className='privacy-policy-heading'>Terms & Conditions</h1>
            </div>

            <div className="privacy-policy-page__content">
                <div className='privacy-policy-content-sub'>
                    <h1 className='privacy-policy-heading' style={{color: "black", marginTop: '0px'}}>General Conditions of this Agreement</h1>
                    <h3 className='privacy-policy-subheading'>Purpose</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>Earlyjobs (hereinafter referred to as 'Website') is an online platform for professionals to meet, exchange ideas, learn, and find opportunities or employees, work, and make decisions in a network of trusted relationships.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Agreement</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>Website is operated and managed by Victaman Services Private Limited (hereinafter referred to as "Company" or "We" or "Us" or "Earlyjobs"). You can access the Service via our websites and software applications ("App(s)"), which together constitute the Service. The creation of an Account and continued usage of the Apps, constitutes consent on part of you to all terms of this Agreement and all associated and attached documents. Parties to this agreement are you and Earlyjobs (hereinafter referred to collectively as "Parties"). This Agreement is solely for the provision of Services. You agree that by clicking on "Register", "Sign up" (or similar) to register for our services ("Earlyjobs"), you are entering into a legally binding agreement, enforceable in a court of law. This "Agreement" includes this User Agreement and the Privacy Policy, and other terms may be amended by Us from time to time, without prior intimation of the same. Continued usage of the Apps shall be construed as consent and acceptance of these terms and conditions. Please note that we do not provide warranties for the Service. The Terms of Service also limits our liability.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Service Eligibility</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>To use the Services, you agree that You must be 18 years or older, You will only have one Earlyjobs account, which must be in your real name and You are not already restricted by Earlyjobs or any other law or order in force from using the Services.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Your Account</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We take no responsibility for any and all activity on your account and no liability lies on us in case of unauthorized use or misuse of your account. Your account belongs to you. You agree to try to choose a strong and secure password, Keep your password secure and confidential, Not transfer any part of your account (e.g., connections, groups) and Follow the law and the terms and conditions of use below.</li>
                        <li className='privacy-policy-item'>You are responsible for anything that happens through your account unless you close it or report misuse.</li>
                        <li className='privacy-policy-item'>Note that for Premium Services purchased by another party for you to use, the party paying for the Premium Service can terminate your access to the Premium Services, and we are not liable for the same.</li>
                        <li className='privacy-policy-item'>In case of suspicious activity on your account, we reserve the right to block access or suspend your account without refunds for any service you had paid for.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Usage</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>You must create an account under your real name and provide a recent profile picture that is of your likeness alone. Use of any other profile pictures may lead to suspension of your account at our discretion. You must provide accurate data while signing up with Earlyjobs in accordance with the form layout.</li>
                        <li className='privacy-policy-item'>You may not imply or state any endorsement or affiliation with Earlyjobs</li>
                        <li className='privacy-policy-item'>In using the Service you may not engage in, facilitate or further unlawful, illegal, fraudulent, harmful or unethical conduct, or do anything in connection with unlawful, illegal, fraudulent or harmful purpose or activity. During use of the service, you shall comply with all applicable laws including, without limitation, all intellectual property laws as well as all regulatory requirements.</li>
                        <li className='privacy-policy-item'>You may not use the Service in a way that harms us or our advertisers, affiliates, or customers, or use any portion of the Service as a destination linked from any unsolicited bulk messages or unsolicited commercial messages (spam). You may not use any automated process or service to access and/or use the Service or use any unauthorized means to modify or reroute, or attempt to modify or reroute, the Service. You may not damage, disable, overburden, or impair the Service (or the network(s) connected to the Service or interfere with anyone's use and enjoyment of the Service. You must not conduct any systematic or automated data collection activities on or in relation to Earlyjobs.</li>
                        <li className='privacy-policy-item'>You must not Republish material from this website, Sell, rent or sun-license material from the website, Show any material from the website in public, Reproduce, duplicate, copy or otherwise exploit material on this website for a commercial purpose other than what is allowed under these terms and conditions, Edit or otherwise modify any material on the website, Redistribute material from this website (except for content specifically and expressly made available for distribution)</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Notices and Services Messages</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>You agree that we may provide notices to you in, A banner notice on the Service, An email sent to an address you provided, Through other means including mobile number, telephone, or mail, Follow the law and the terms and conditions of use below, You agree to keep your contact information up to date and we are not liable for any action or damages that rise from your providing incorrect or out-dated information.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Messages & Sharing</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>Our Services allow messaging and sharing of information in many ways. Information and content that you share or post may be seen by other Users or, if public, by Visitors. We are not obligated to publish any information or content on our Service and can remove it at our sole discretion, with or without notice.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Credits & Payment</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>If you buy our paid Services (Premium Services), you will be given an invoice that will describe any taxes or duties paid by us.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Service Availability</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We may change, suspend or end any Service, or change and modify prices prospectively at our discretion. To the extent allowed under law, these changes may be effective upon notice provided to you.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Earlyjobs Content</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>The Website, the Services, and their contents may only be used in accordance with the terms of this Agreement. All materials displayed or performed on the Website or in the Services, including, but not limited to text, graphics, articles, photographs, images, illustrations (also known as the Earlyjobs Content) are protected by copyright. You shall abide by all copyright notices, trademark rules, information, and restrictions contained in any Content or data accessed through the Services, and shall not use, copy, reproduce, modify, translate, publish, broadcast, transmit, distribute, perform, upload, display, license, sell or otherwise exploit for any purposes whatsoever any Earlyjobs Content or other proprietary rights not owned by you without the express prior written consent.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>User Generated Content</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We don’t generally review content provided by our Users and Users are personally liable for any information or content provided by them. By using the Services, you may encounter content or information that might be inaccurate, incomplete, delayed, misleading, illegal, offensive or otherwise harmful. You agree that we are not responsible for content you find on Earlyjobs or for any damages as result of your use of or reliance on it.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Limits on Usage</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>Earlyjobs reserves the right, without notice or liability; to at its sole discretion to change, suspend or discontinue any aspect of your account or terminate your account, due to any material breach by you of the terms and conditions of this Agreement, or any action on part of you, prohibited under any law or regulation in force, leading to misuse of any kind, as determined by Earlyjobs.com in its sole and complete discretion.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Software and Apps</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>Using the Service may require you to download and install client software (App(s)) on your smartphone, tablet computer, PC or otherwise. Earlyjobs provides you a limited, nonexclusive, non-transferable, revocable license to use the App(s), solely to access the Service. Your license to use the Software is automatically revoked if you violate these Terms. You may not reverse-engineer, copy, distribute, modify, lease, or sell any part of our Service. Earlyjobs may update App(s) installed on your devices when a new version becomes available.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Trademark and Copyright</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>Earlyjobs is a registered trademark of Victaman Services Private Limited The Software and other technology we use to provide the Service are protected by copyright, trademark, and other laws of both India and foreign countries. These Terms do not grant you any rights to use the Earlyjobs trademarks, logos, domain names, or other brand features.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Nature of Relationship between parties</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>The Parties are independent contractors. None of the Parties have any right, power or authority to enter into any agreement for or on behalf of, or incur any obligation or liability of, or to otherwise bind the other Parties. These Terms of Service do not, and shall not be construed to, create any partnership, joint venture, employer-employee, agency or franchisor-franchisee relationship between you and Victaman Services Private Limited.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>No Warranties</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>Earlyjobs provides the Service on "as-is" and "as-available" basis, with all faults and as available with no guarantee to the accuracy or timeliness of information available from the Service. Earlyjobs gives no express warranties, guarantees or conditions and excludes any implied warranties. We also disclaim any warranties of merchantability, fitness for a particular purpose or non-infringement. Earlyjobs has no responsibility for any harm to your computer system, loss or corruption of data, or other harm that results from your access to or use of the Service.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Hold Harmless</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>You agree to indemnify, defend and hold harmless Victaman Services Private Limited, subsidiaries, affiliates, officers, directors, employees, consultants, agents, successors and assigns from any and all third party claims, liability, damages, costs or demands, including, but not limited to, attorneys fees, arising from Your use of the Service, including, but not limited to, all content therein and any products or services obtained by you through the Service, The violation of these Terms of Service by you, The infringement by you (or other user of the Service using your account) of any intellectual property or other right of any person or entity; or Your violation of any applicable law or regulation.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Refunds</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>Earlyjobs does not offer refunds. The services are offered on an "as is" and "available-as" basis and no guarantees or warranties are provided with regards to the end benefit to you as a user. The payment made to Us, is independent of the end result of the association between us and you.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Confidentiality</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>The Parties shall as applicable, keep all information and other materials passing between them and any other Parties in relation to the transactions envisaged by and undertaken in the course of this Agreement, and also in relation to the Apps, confidential and shall not divulge any information to any other Person or use the information other than for carrying out the purposes of this Agreement except To the extent such information is in the public domain, To the extent such information is required or requested to be disclosed by any applicable Law or any applicable regulatory requirements or body to whose jurisdiction the Parties are subject, To the extent that such information is later acquired by such Party from a source not obligated to any other Party, or its Affiliates to keep such Information confidential, To the extent that such information was already known or in the lawful possession of a Party prior to disclosure by any other Party, To the extent that any information, materially similar to the Information, shall have been independently developed by a Party without reference to any Information furnished by any other Party.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Severability</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>All provisions of this Agreement shall be severable and no such provisions shall be affected by the invalidity of any other provision to the extent that such invalidity does not also render such other provisions invalid. In the event of the invalidity of any provision, this Agreement shall be interpreted and enforced as if all the provisions thereby rendered invalid were not contained herein. If any provision of this Agreement shall be susceptible to two interpretations, one of which would render the provision invalid and the other of which would cause the provision to be valid, such provision shall be deemed to have the meaning which would cause it to be valid. If any provision of this Agreement shall be prohibited by or adjudicated by a court to be unlawful, void or unenforceable such provision shall to the extent required, be severed from this Agreement and rendered ineffective as far as possible without modifying the remaining provisions of this Agreement and shall not in any way affect any other provisions or the validity or enforcement of this Agreement.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Waiver</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>Any Party’s delay or failure to exercise any right, power or privilege under this Agreement shall not operate as a waiver; nor shall any single or partial exercise of any right, power of privilege preclude any other or further exercise thereof.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>TERMINATION</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>Earlyjobs may terminate or suspend your service account or ability to use the Service, in whole or in part, at its sole discretion, for any or no reason, and without notice or liability of any kind. For example, your service account may be terminated or suspended if you misuse the Service. Any such termination or suspension could prevent you from accessing the Service and Your Content, or any other information related to the use of the Service. You may cancel your service account at any time, with or without cause. Any amounts owed by either party prior to termination remain owed after termination.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>JURISDICTION AND GOVERNING LAW</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>The Service is controlled and operated by Victaman Services Private Limited from India, and is not intended to subject Victaman Services Private Limited to the laws or jurisdiction of any territory other than that of India. Victaman Services Private Limited does not represent or warrant that the Service or any part thereof is appropriate or available for use in any particular jurisdiction. Those who choose to access the Service do so on their own initiative and at their own risk, and are responsible for complying with all local laws, rules and regulations. Victaman Services Private Limited may limit the Services availability, in whole or in part, to any person, geographic area or jurisdiction we choose, at any time and at our sole discretion.</li>
                        <li className='privacy-policy-item'>You agree that your information may be transferred to, stored, and processed where our servers and central database are located and operated, and in using our services, you agree that your information may be transferred to our facilities and those third parties with whom we share it as described in our Privacy Policy. These Terms of Service shall be governed by and construed in accordance with the laws of Bengaluru, India, without giving effect to any principles of conflicts of law. The jurisdiction of any action arising shall lie exclusively with the Courts at Bengaluru, India.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>CHANGES TO THE TERMS OF SERVICE</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We may revise these Terms of Service from time to time, without prior notice in the interest of bettering and furthering our Services. The latest copy will always be available on our website and the onus shall lie on you to keep yourself informed of changes from time to time. If changes to these Terms of Service are made, that in our sole discretion, are material, we will notify you either by posting a notice of such changes and/or via the email associated with your Service account. By continuing to access or use the Service after those changes become effective, you agree to be bound by the revised Terms of Service.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>ADDITIONAL TERMS FOR 'Hands-on service'</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>Company offers an optional "Hands-on service" is an optional premium service for the purpose of identifying and locating the requisite talent and candidate for designated posts, as requested by employers wanting to use said service. If you are using this service, you agree to be bound by additional terms that will be shared with you separately. In case of any differences, those terms will supersede the terms described in this document.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>COMPLAINTS, NOTICES AND FEEDBACK</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We respect the intellectual property rights of others. We require that information posted by Users be accurate and not in violation of the intellectual property rights or other rights of third parties.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TermsPage;