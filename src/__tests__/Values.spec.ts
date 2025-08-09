import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Values from '../components/Values.vue'

describe('Values.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(Values)
  })

  describe('Component Rendering', () => {
    it('renders the values component', () => {
      expect(wrapper.find('.values').exists()).toBe(true)
      expect(wrapper.find('.values-container').exists()).toBe(true)
    })

    it('renders the values header section', () => {
      expect(wrapper.find('.values-header').exists()).toBe(true)
      expect(wrapper.find('.values-title').text()).toBe('Core Values')
      expect(wrapper.find('.values-intro').text()).toBe('The principles that guide my work and professional relationships')
    })

    it('renders values grid and cards', () => {
      expect(wrapper.find('.values-grid').exists()).toBe(true)
      expect(wrapper.findAll('.value-card').length).toBeGreaterThan(0)
    })
  })

  describe('Value Cards', () => {
    it('displays correct number of value cards', () => {
      const valueCards = wrapper.findAll('.value-card')
      expect(valueCards.length).toBe(6) // Based on the values data
    })

    it('displays value cards with correct structure', () => {
      const valueCards = wrapper.findAll('.value-card')
      
      valueCards.forEach(card => {
        expect(card.find('.value-icon').exists()).toBe(true)
        expect(card.find('.value-title').exists()).toBe(true)
        expect(card.find('.value-description').exists()).toBe(true)
        expect(card.find('.value-examples').exists()).toBe(true)
        expect(card.find('h4').text()).toBe('In Practice:')
        expect(card.find('ul').exists()).toBe(true)
        expect(card.findAll('li').length).toBeGreaterThan(0)
      })
    })

    it('displays excellence value correctly', () => {
      const valueCards = wrapper.findAll('.value-card')
      const excellenceCard = valueCards[0]
      
      expect(excellenceCard.find('.value-icon').text()).toBe('🎯')
      expect(excellenceCard.find('.value-title').text()).toBe('Excellence')
      expect(excellenceCard.find('.value-description').text()).toContain('I strive for the highest quality')
      
      const examples = excellenceCard.findAll('li')
      expect(examples.length).toBe(3)
      expect(examples[0].text()).toBe('Writing clean, maintainable code')
      expect(examples[1].text()).toBe('Thorough testing and documentation')
      expect(examples[2].text()).toBe('Continuous learning and skill development')
    })

    it('displays collaboration value correctly', () => {
      const valueCards = wrapper.findAll('.value-card')
      const collaborationCard = valueCards[1]
      
      expect(collaborationCard.find('.value-icon').text()).toBe('🤝')
      expect(collaborationCard.find('.value-title').text()).toBe('Collaboration')
      expect(collaborationCard.find('.value-description').text()).toContain('I believe in the power of teamwork')
      
      const examples = collaborationCard.findAll('li')
      expect(examples.length).toBe(3)
      expect(examples[0].text()).toBe('Active participation in team discussions')
      expect(examples[1].text()).toBe('Knowledge sharing and mentoring')
      expect(examples[2].text()).toBe('Cross-functional collaboration')
    })

    it('displays innovation value correctly', () => {
      const valueCards = wrapper.findAll('.value-card')
      const innovationCard = valueCards[2]
      
      expect(innovationCard.find('.value-icon').text()).toBe('💡')
      expect(innovationCard.find('.value-title').text()).toBe('Innovation')
      expect(innovationCard.find('.value-description').text()).toContain('I embrace new technologies')
      
      const examples = innovationCard.findAll('li')
      expect(examples.length).toBe(3)
      expect(examples[0].text()).toBe('Exploring emerging Salesforce features')
      expect(examples[1].text()).toBe('Proposing process improvements')
      expect(examples[2].text()).toBe('Implementing creative solutions')
    })

    it('displays integrity value correctly', () => {
      const valueCards = wrapper.findAll('.value-card')
      const integrityCard = valueCards[3]
      
      expect(integrityCard.find('.value-icon').text()).toBe('🔒')
      expect(integrityCard.find('.value-title').text()).toBe('Integrity')
      expect(integrityCard.find('.value-description').text()).toContain('I maintain the highest ethical standards')
      
      const examples = integrityCard.findAll('li')
      expect(examples.length).toBe(3)
      expect(examples[0].text()).toBe('Honest communication about project timelines')
      expect(examples[1].text()).toBe('Protecting client data and privacy')
      expect(examples[2].text()).toBe('Taking responsibility for mistakes')
    })

    it('displays growth mindset value correctly', () => {
      const valueCards = wrapper.findAll('.value-card')
      const growthCard = valueCards[4]
      
      expect(growthCard.find('.value-icon').text()).toBe('📈')
      expect(growthCard.find('.value-title').text()).toBe('Growth Mindset')
      expect(growthCard.find('.value-description').text()).toContain('I view challenges as opportunities')
      
      const examples = growthCard.findAll('li')
      expect(examples.length).toBe(3)
      expect(examples[0].text()).toBe('Seeking feedback on code reviews')
      expect(examples[1].text()).toBe('Learning from project retrospectives')
      expect(examples[2].text()).toBe('Pursuing certifications and training')
    })

    it('displays efficiency value correctly', () => {
      const valueCards = wrapper.findAll('.value-card')
      const efficiencyCard = valueCards[5]
      
      expect(efficiencyCard.find('.value-icon').text()).toBe('⚡')
      expect(efficiencyCard.find('.value-title').text()).toBe('Efficiency')
      expect(efficiencyCard.find('.value-description').text()).toContain('I focus on delivering maximum value')
      
      const examples = efficiencyCard.findAll('li')
      expect(examples.length).toBe(3)
      expect(examples[0].text()).toBe('Automating repetitive tasks')
      expect(examples[1].text()).toBe('Optimizing code performance')
      expect(examples[2].text()).toBe('Streamlining development workflows')
    })
  })

  describe('Data Structure', () => {
    it('contains all expected core values', () => {
      const valueCards = wrapper.findAll('.value-card')
      const expectedTitles = [
        'Excellence',
        'Collaboration',
        'Innovation',
        'Integrity',
        'Growth Mindset',
        'Efficiency'
      ]
      
      expectedTitles.forEach((title, index) => {
        expect(valueCards[index].find('.value-title').text()).toBe(title)
      })
    })

    it('has proper example lists for each value', () => {
      const valueCards = wrapper.findAll('.value-card')
      
      valueCards.forEach(card => {
        const examples = card.findAll('li')
        expect(examples.length).toBe(3) // Each value should have 3 examples
      })
    })

    it('displays proper icons for each value', () => {
      const valueCards = wrapper.findAll('.value-card')
      const expectedIcons = ['🎯', '🤝', '💡', '🔒', '📈', '⚡']
      
      expectedIcons.forEach((icon, index) => {
        expect(valueCards[index].find('.value-icon').text()).toBe(icon)
      })
    })
  })

  describe('Examples Section', () => {
    it('displays "In Practice:" header for each value', () => {
      const valueCards = wrapper.findAll('.value-card')
      
      valueCards.forEach(card => {
        expect(card.find('h4').text()).toBe('In Practice:')
      })
    })

    it('displays examples as list items', () => {
      const valueCards = wrapper.findAll('.value-card')
      
      valueCards.forEach(card => {
        const examplesList = card.find('ul')
        expect(examplesList.exists()).toBe(true)
        
        const listItems = card.findAll('li')
        expect(listItems.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      expect(wrapper.find('section').exists()).toBe(true)
      expect(wrapper.find('h2').exists()).toBe(true) // Main title
      expect(wrapper.findAll('h3').length).toBeGreaterThan(0) // Value titles
      expect(wrapper.findAll('h4').length).toBeGreaterThan(0) // "In Practice:" headers
    })

    it('uses semantic HTML elements', () => {
      expect(wrapper.find('section.values').exists()).toBe(true)
      expect(wrapper.findAll('p').length).toBeGreaterThan(0) // Descriptions
      expect(wrapper.findAll('ul').length).toBeGreaterThan(0) // Example lists
      expect(wrapper.findAll('li').length).toBeGreaterThan(0) // List items
    })

    it('has proper heading hierarchy', () => {
      expect(wrapper.find('h2.values-title').exists()).toBe(true)
      expect(wrapper.findAll('h3.value-title').length).toBe(6)
      expect(wrapper.findAll('h4').length).toBe(6) // One "In Practice:" per value
    })
  })

  describe('CSS Classes', () => {
    it('has correct CSS classes for styling', () => {
      expect(wrapper.classes()).toContain('values')
      expect(wrapper.find('.values-container').exists()).toBe(true)
      expect(wrapper.find('.values-header').exists()).toBe(true)
      expect(wrapper.find('.values-grid').exists()).toBe(true)
    })

    it('has proper card structure classes', () => {
      const valueCards = wrapper.findAll('.value-card')
      expect(valueCards.length).toBeGreaterThan(0)
      
      valueCards.forEach(card => {
        expect(card.find('.value-icon').exists()).toBe(true)
        expect(card.find('.value-title').exists()).toBe(true)
        expect(card.find('.value-description').exists()).toBe(true)
        expect(card.find('.value-examples').exists()).toBe(true)
      })
    })
  })

  describe('Content Quality', () => {
    it('has meaningful descriptions for each value', () => {
      const valueCards = wrapper.findAll('.value-card')
      
      valueCards.forEach(card => {
        const description = card.find('.value-description').text()
        expect(description.length).toBeGreaterThan(50) // Ensure substantial descriptions
        expect(description).toMatch(/^I /) // Descriptions should be personal
      })
    })

    it('has practical examples for each value', () => {
      const valueCards = wrapper.findAll('.value-card')
      
      valueCards.forEach(card => {
        const examples = card.findAll('li')
        examples.forEach(example => {
          expect(example.text().length).toBeGreaterThan(10) // Ensure meaningful examples
        })
      })
    })
  })

  describe('Responsive Design Elements', () => {
    it('has responsive container structure', () => {
      expect(wrapper.find('.values-container').exists()).toBe(true)
      expect(wrapper.find('.values-grid').exists()).toBe(true)
    })
  })
})