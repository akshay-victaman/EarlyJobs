import React, { useEffect } from 'react'
import './style.css'

const PrivacyPolicyPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="privacy-policy-page">
            <div className="privacy-policy-page__background">
                <h1 className='privacy-policy-heading'>Privacy Policies</h1>
            </div>

            <div className="privacy-policy-page__content">
                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Victaman Services Private Limited (‘Earlyjobs’ 'Victaman,' the 'Company,' 'we,' 'us,' and 'our,') respect your privacy and are committed to protecting it through our compliance with this privacy policy. This policy describes:</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(a)</span> The types of information that we may collect from you when you access or use our websites, applications and other online services (collectively, our 'Services'); and</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(b)</span> Our practices for collecting, using, maintaining, protecting and disclosing that information.</li>
                        <li className='privacy-policy-item'>This policy applies only to information we collect through our Services, in email, text and other electronic communications sent through or in connection with our Services.</li>
                        <li className='privacy-policy-item'>Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use our Services. By accessing or using our Services, you agree to this privacy policy. This policy may change from time to time, your continued use of our Services after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>The information we collect and how we use it</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We collect several types of information from and about users of our Services, including information:</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(a)</span> By which you may be personally identified; and/or</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(b)</span>  About your internet connection, the equipment you use to access our Services and your usage details.</li>
                        <li className='privacy-policy-item'>We collect this information:</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(a)</span> Directly from you when you provide it to us; and/or</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(b)</span> Automatically as you navigate through our Services (information collected automatically may include usage details, IP addresses and information collected through cookies, web beacons and other tracking technologies).</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Information You Provide to Us</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>The information we collect on or through our Services may include:</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(a) Your account information:</span> Your full name, email address and other information you may provide with your account, such as your profession, industry, locations, mobile phone number and website. Your profile picture that will be publicly displayed as part of your account profile. You may optionally provide us with this information through third-party sign-in services such as Facebook and Google. In such cases, we fetch and store whatever information is made available to us by you through these sign-in services.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(b) Your content:</span> Information you provide through our Services, including your projects (title, images, summary, tags etc.), education details , experiences , collaborators, your connections, job application details (email id, name, contact number , curriculum vitae, portfolio, salary, notice period, review etc.) and other information you provide on our Services, and other information in your account profile.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(c) Your searches and other activities:</span> The search terms you have looked up and results you selected.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(d) Your browsing information:</span> How long you used our Services and which features you used.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(e) Your communications:</span> Communications between you and other users through our Services. your request for certain features (e.g., newsletters, updates or other products). your communication with us about employment opportunities posted to the services.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(f) Your Public Posts:</span> You also may provide information (your contact number, website, company details, project details etc.) to be published or displayed (hereinafter, 'posted') on publicly accessible areas of our Services, or transmitted to other users of our Services or third-parties (collectively, 'User Contributions'). Your User Contributions are posted on and transmitted to others at your own risk. Although we limit access to certain pages, you may set certain privacy settings for such information by logging into your account profile. Please be aware that no security measures are perfect or impenetrable (see 'Security' section below). Additionally, we cannot control the actions of other users of our Services with whom you may choose to share your User Contributions. Therefore, we cannot and do not guarantee that your User Contributions will not be viewed by unauthorized persons. We may display this information on the Services, share it with businesses, and further distribute it to a wider audience through third party sites and services. You should be careful about revealing any sensitive details about yourself in such postings.</li>
                        <li className='privacy-policy-item'>We use the information you provide to us to enhance the functionality and improve the quality of our Services, and to personalize your experience while using our Services. We also use this information to display relevant feeds(projects, articles, recommendations, spotlights), provide support to you, communicate with you, and comply with our legal obligations</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Information About Your Messages</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>The information we collect on or through our Services may include:</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Information We Collect Through Automatic Data Collection Technologies</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We may automatically collect certain information about the computer or devices (including mobile devices) you use to access the Services, and about your use of the Services, even if you use the Services without registering or logging in.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(a) Usage information:</span> Details of your use of our Services, including traffic data, location data, logs and other communication data and the resources that you access and use on or through our Services.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(b) Computer and device information:</span> Information about your computer, Internet connection and mobile device, including your IP address, operating systems, platforms, browser type, other browsing information (connection, speed, connection type etc.), device type, device’s unique device identifier, mobile network information and the device’s telephone number.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(c) Stored information and files:</span>  Our applications also may access metadata and other information associated with other files stored on your mobile device. This may include, for example, photographs, audio and video clips, personal contacts and address book information.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(d) Your activity on the Services:</span> Information about your activity on the Services, such as your search queries, comments, domain names, search results selected, number of clicks, pages viewed and the order of those pages, how long you visited our Services, the date and time you used the Services, error logs, and other similar information.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(e) Mobile status:</span> For mobile application users, the online or offline status of your application.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Information from Third Parties</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We may collect, process and store your user ID associated with any social media account (such as your Facebook and Google account) that you use to sign into the Services or connect with or use with the Services. When you sign in to your account with your social media account information, or otherwise connect to your social media account with the Services, you consent to our collection, storage, and use, in accordance with this Privacy Policy, of the information that you make available to us through the social media interface. This could include, without limitation, any information that you have made public through your social media account, information that the social media service shares with us, or information that is disclosed during the sign-in process. Please see your social media provider’s privacy policy and help center for more information about how they share information when you choose to connect your account.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Anonymous or De-Identified Data</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We may anonymize and/or de-identify information collected from you through the Services or via other means, including via the use of third-party web analytic tools as described below. As a result, our use and disclosure of aggregated and/or de-identified information is not restricted by this Privacy Policy, and it may be used and disclosed to others without limitation.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>How we use the information we collect</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We use the information we collect from and about you for a variety of purposes, including to:</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(a)</span> Process and respond to your queries</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(b)</span> Understand our users (what they do on our Services, what features they like, how they use them, etc.), improve the content and features of our Services (such as by personalizing content to your interests), process and forward your job application, and make personalize feeds.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(c)</span> Administer our Services and diagnose technical problems.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(d)</span> Send you communications that you have requested or that may be of interest to you by way of emails, or courier, or registered post, or telephone calls, or any other mode of communication.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(e)</span> Generate and review reports and data about, and to conduct research on, our user base and Service usage patterns.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(f)</span> Provide you with customer support.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(g)</span> Provide you with notices about your account.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(h)</span> Notify you about changes to our Services.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(i)</span> Allow you to participate in interactive features offered through our Services.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(j)</span> In any other way we may describe when you provide the information.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(k)</span> For any other purpose with your consent.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>How we share the information we collect</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We may disclose personal information that we collect or you provide, as described in this privacy policy, in the following ways:</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>General Information Disclosures</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(a)</span> To our subsidiaries and affiliates, which are entities under common ownership or control of our ultimate parent company Victaman Services Private Limited</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(b)</span> To contractors, service providers and other third-parties whom we use to support our business (e.g. Design agencies, recruitment firms, companies ) and who are bound by contractual obligations to keep personal information confidential and use it only for the purposes for which we disclose it to them.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(c)</span> To fulfill the purpose for which you provide it.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(d)</span> For any other purpose disclosed by us when you provide the information.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(e) Legal Purposes.</span> We may share your information when we believe in good faith that such sharing is reasonably necessary in order to investigate, prevent, or take action regarding possible illegal activities or to comply with the legal process. We may also share your information to investigate and address threats or potential threats to the physical safety of any person, to investigate and address violations of this Privacy Policy or the Terms of Service, or to investigate and address violations of the rights of third parties and/or to protect the rights, property and safety of Earlyjobs, our employees, users, or the public. This may involve the sharing of your information with law enforcement, government agencies, courts, and/or other organizations on account of legal requests such as subpoena, court order or government demand to comply with the law.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(f)</span> If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of Earlyjobs, our customers or others. This includes exchanging information with other companies and organizations for the purposes of fraud protection and credit risk reduction.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(g)</span>  We may share your information in any other circumstances where we have your consent.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Analytics</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>To help us better understand your use of the Services, we may use third-party web analytics on our Services, such as Google Analytics. These service providers use the sort of technology described in the “Automatically-Collected Information” Section above. The information collected by this technology will be disclosed to or collected directly by these service providers, who use the information to evaluate our users’ use of the Services.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Communications choices</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>When you sign up for an account, you are opting in to receive emails from other Earlyjobs users, businesses, and Earlyjobs itself. You can log in to manage your email preferences and you can opt to give privacy settings to contacts, but note that you cannot opt out of receiving certain administrative notices, service notices, or legal notices from Earlyjobs.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Accessing & correcting your personal information</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We will take reasonable steps to accurately record the personal information that you provide to us and any subsequent updates.</li>
                        <li className='privacy-policy-item'>We encourage you to review, update, and correct the personal information that we maintain about you, and you may request that we delete personal information about you that is inaccurate, incomplete, or irrelevant for legitimate purposes, or are being processed in a way which infringes any applicable legal requirement.</li>
                        <li className='privacy-policy-item'>Your right to review, update, correct, and delete your personal information may be limited, subject to the law of your jurisdiction:</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(a)</span> if your requests are abusive or unreasonably excessive, (ii) where the rights or safety of another person or persons would be encroached upon, or</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(b)</span> where the rights or safety of another person or persons would be encroached upon, or</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>(c)</span> if the information or material you request relates to existing or anticipated legal proceedings between you and us, or providing access to you would prejudice negotiations between us or an investigation of possible unlawful activity. Your right to review, update, correct, and delete your information is subject to our records retention policies and applicable law, including any statutory retention requirements.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Security: How we protect your information</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We have implemented appropriate physical, electronic, and managerial procedures to safeguard and help prevent unauthorized access to your information and to maintain data security. These safeguards take into account the sensitivity of the information that we collect, process and store and the current state of technology. However, no method of transmission over the Internet or via mobile device, or method of electronic storage, is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security and thereby usage in a manner that is inconsistent with this Privacy Policy.</li>
                        <li className='privacy-policy-item'>We assume no liability or responsibility for disclosure of your information due to errors in transmission, unauthorized third-party access, or other causes beyond our control. You play an important role in keeping your personal information secure. You should not share your user name, password, or other security information for your Earlyjobs account with anyone. If we receive instructions using your user name and password, we will consider that you have authorized the instructions.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Third party links and services</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>The Services may contain links to third-party websites. Your use of these features may result in the collection, processing or sharing of information about you, depending on the feature. Please be aware that we are not responsible for the content or privacy practices of other websites or services which may be linked on our services. We do not endorse or make any representations about third-party websites or services. Our Privacy Policy does not cover the information you choose to provide to or that is collected by these third parties. We strongly encourage you to read such third parties’ privacy policies.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Compliance with data protection regulation</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>The information we obtain from or about you may be processed and stored in India and our other various servers located across the globe, which may provide for different data protection rules than the country in which you reside. We comply with generally accepted industry standard regulations regarding the collection, use, and retention of data. Each location may provide for different data protection rules than the country in which you reside. By using the Services, you consent to the collection, transfer, use, storage and disclosure of your information as described in this Privacy Policy, including to the transfer of your information outside of your country of residence. If you have any questions relating to your personal data, please write to us on varun@Earlyjobs.com.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Changes to this privacy policy</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>We reserve the right to amend this Privacy Policy from time to time to reflect changes in the law, our data collection and use practices, the features of our services, or advances in technology. Please check this page periodically for changes. Use of information we collect is subject to the Privacy Policy in effect at the time such information is used. If we make any material changes to this Privacy Policy, we will post the changes here. Please review the changes carefully. Your continued use of the Services following the posting of changes to this Privacy Policy will constitute your consent and acceptance of those changes.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicyPage