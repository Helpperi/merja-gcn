import React from 'react'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import ContactForm from '../components/ContactForm'
import SEO from '../components/SEO'

const Contact = ({ data }) => {
  return (
    <Layout>
      <SEO title="Ota yhteyttä" description="Ota yhteyttä kuntapäättäjään Merja Oksman!" />
      <Container>
        <PageTitle>OTA YHTEYTTÄ</PageTitle>
        <ContactForm />
      </Container>
    </Layout>
  )
}

export default Contact
