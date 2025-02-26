'use client';

import { Accordion, AccordionItem } from '@heroui/accordion';

export const FaqComponent = () => {
    return (
        <Accordion
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        height: 'auto',
                        overflowY: 'unset',
                        transition: {
                            height: {
                                type: 'spring',
                                stiffness: 500,
                                damping: 30,
                                duration: 1,
                            },
                            opacity: {
                                easings: 'ease',
                                duration: 1,
                            },
                        },
                    },
                    exit: {
                        y: -10,
                        opacity: 0,
                        height: 0,
                        overflowY: 'hidden',
                        transition: {
                            height: {
                                easings: 'ease',
                                duration: 0.25,
                            },
                            opacity: {
                                easings: 'ease',
                                duration: 0.3,
                            },
                        },
                    },
                },
            }}
        >
            <AccordionItem key="long" aria-label="Accordion 1" title="How long does it take to activate my account?">
                Your account will be activated within 24 hours after you register and submit the KYC documents. All you need to do is sign up, verify your account, submit documents, and wait for your KYC approval.
            </AccordionItem>
            <AccordionItem key="secret" aria-label="Accordion 2" title="How do I generate a secret key?">
                Login to your dashboard and go to the ‘Manage API Keys’ section. Click on ‘generate keys’ to show your encrypted keys and then click on ‘show keys’. Here is a detailed guide to generate a secret key.
            </AccordionItem>
            <AccordionItem key="payment" aria-label="Accordion 3" title="How secure is your payment gateway?">
                We use the latest encryption technology to ensure that your funds are protected at all times. Measures like tokenization ensure that the payment details of the user are stored in an encrypted manner to combat any hacking attempts.
            </AccordionItem>
            <AccordionItem key="customer" aria-label="Accordion 4" title="Do you have 24/7 customer support?">
                Yes, merchants can contact our team 24/7 for assistance. Email and chat support is also offered to the customers who make payments using the payment gateway.
            </AccordionItem>
            <AccordionItem key="website" aria-label="Accordion 5" title="Do I need a website or mobile app to accept payments online?">
                Not necessarily. Our Payment Gateway and Payment Links ensure that businesses without an app or a website can accept online payment without any hassle.
            </AccordionItem>
            <AccordionItem key="track" aria-label="Accordion 6" title="How do I track transactions?">
                Our Dashboard provides you with a detailed view of your transactions. You can also download your transaction history in CSV format.
            </AccordionItem>
        </Accordion>
    );
};
