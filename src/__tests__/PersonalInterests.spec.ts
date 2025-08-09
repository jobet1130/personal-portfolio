import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PersonalInterests from '../components/PersonalInterests.vue'

describe('PersonalInterests.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(PersonalInterests)
  })

  describe('Component Rendering', () => {
    it('renders the personal interests component', () => {
      expect(wrapper.find('.personal-interests').exists()).toBe(true)
      expect(wrapper.find('.interests-container').exists()).toBe(true)
    })

    it('renders the interests header section', () => {
      expect(wrapper.find('.interests-header').exists()).toBe(true)
      expect(wrapper.find('.interests-title').text()).toBe('Beyond the Code')
      expect(wrapper.find('.interests-intro').text()).toBe('My passions and interests that fuel creativity and balance')
    })

    it('renders interests content and grid', () => {
      expect(wrapper.find('.interests-content').exists()).toBe(true)
      expect(wrapper.find('.interests-grid').exists()).toBe(true)
      expect(wrapper.findAll('.interest-card').length).toBeGreaterThan(0)
    })

    it('renders fun facts section', () => {
      expect(wrapper.find('.fun-facts').exists()).toBe(true)
      expect(wrapper.find('.fun-facts-title').text()).toBe('Fun Facts About Me')
      expect(wrapper.find('.facts-grid').exists()).toBe(true)
      expect(wrapper.findAll('.fact-item').length).toBeGreaterThan(0)
    })
  })

  describe('Interest Cards', () => {
    it('displays correct number of interest cards', () => {
      const interestCards = wrapper.findAll('.interest-card')
      expect(interestCards.length).toBe(6) // Based on the interests data
    })

    it('displays interest cards with correct structure', () => {
      const interestCards = wrapper.findAll('.interest-card')
      
      interestCards.forEach(card => {
        expect(card.find('.interest-icon').exists()).toBe(true)
        expect(card.find('.interest-title').exists()).toBe(true)
        expect(card.find('.interest-description').exists()).toBe(true)
        expect(card.find('.interest-details').exists()).toBe(true)
      })
    })

    it('displays technology exploration interest correctly', () => {
      const interestCards = wrapper.findAll('.interest-card')
      const techCard = interestCards[0]
      
      expect(techCard.find('.interest-icon').text()).toBe('💻')
      expect(techCard.find('.interest-title').text()).toBe('Technology Exploration')
      expect(techCard.find('.interest-description').text()).toContain('Always curious about emerging technologies')
      
      const details = techCard.findAll('.detail-item')
      expect(details.length).toBe(4)
      expect(details[0].text()).toBe('AI & Machine Learning')
      expect(details[1].text()).toBe('Cloud Computing')
      expect(details[2].text()).toBe('IoT Devices')
      expect(details[3].text()).toBe('Blockchain')
    })

    it('displays continuous learning interest correctly', () => {
      const interestCards = wrapper.findAll('.interest-card')
      const learningCard = interestCards[1]
      
      expect(learningCard.find('.interest-icon').text()).toBe('📚')
      expect(learningCard.find('.interest-title').text()).toBe('Continuous Learning')
      expect(learningCard.find('.interest-description').text()).toContain('Passionate about expanding knowledge')
      
      const details = learningCard.findAll('.detail-item')
      expect(details.length).toBe(4)
      expect(details[0].text()).toBe('Technical Books')
      expect(details[1].text()).toBe('Online Courses')
      expect(details[2].text()).toBe('Podcasts')
      expect(details[3].text()).toBe('Tech Conferences')
    })

    it('displays gaming & strategy interest correctly', () => {
      const interestCards = wrapper.findAll('.interest-card')
      const gamingCard = interestCards[2]
      
      expect(gamingCard.find('.interest-icon').text()).toBe('🎮')
      expect(gamingCard.find('.interest-title').text()).toBe('Gaming & Strategy')
      expect(gamingCard.find('.interest-description').text()).toContain('Enjoy strategic games')
      
      const details = gamingCard.findAll('.detail-item')
      expect(details.length).toBe(4)
      expect(details[0].text()).toBe('Strategy Games')
      expect(details[1].text()).toBe('Puzzle Solving')
      expect(details[2].text()).toBe('Board Games')
      expect(details[3].text()).toBe('Chess')
    })

    it('displays fitness & wellness interest correctly', () => {
      const interestCards = wrapper.findAll('.interest-card')
      const fitnessCard = interestCards[3]
      
      expect(fitnessCard.find('.interest-icon').text()).toBe('🏃‍♂️')
      expect(fitnessCard.find('.interest-title').text()).toBe('Fitness & Wellness')
      expect(fitnessCard.find('.interest-description').text()).toContain('Maintaining physical and mental health')
      
      const details = fitnessCard.findAll('.detail-item')
      expect(details.length).toBe(4)
      expect(details[0].text()).toBe('Running')
      expect(details[1].text()).toBe('Yoga')
      expect(details[2].text()).toBe('Meditation')
      expect(details[3].text()).toBe('Hiking')
    })

    it('displays music & creativity interest correctly', () => {
      const interestCards = wrapper.findAll('.interest-card')
      const musicCard = interestCards[4]
      
      expect(musicCard.find('.interest-icon').text()).toBe('🎵')
      expect(musicCard.find('.interest-title').text()).toBe('Music & Creativity')
      expect(musicCard.find('.interest-description').text()).toContain('Music serves as both inspiration')
      
      const details = musicCard.findAll('.detail-item')
      expect(details.length).toBe(4)
      expect(details[0].text()).toBe('Guitar Playing')
      expect(details[1].text()).toBe('Music Production')
      expect(details[2].text()).toBe('Concert Attendance')
      expect(details[3].text()).toBe('Vinyl Collection')
    })

    it('displays sustainability interest correctly', () => {
      const interestCards = wrapper.findAll('.interest-card')
      const sustainabilityCard = interestCards[5]
      
      expect(sustainabilityCard.find('.interest-icon').text()).toBe('🌱')
      expect(sustainabilityCard.find('.interest-title').text()).toBe('Sustainability')
      expect(sustainabilityCard.find('.interest-description').text()).toContain('Committed to environmental consciousness')
      
      const details = sustainabilityCard.findAll('.detail-item')
      expect(details.length).toBe(4)
      expect(details[0].text()).toBe('Renewable Energy')
      expect(details[1].text()).toBe('Eco-friendly Tech')
      expect(details[2].text()).toBe('Urban Gardening')
      expect(details[3].text()).toBe('Recycling')
    })
  })

  describe('Fun Facts Section', () => {
    it('displays correct number of fun facts', () => {
      const factItems = wrapper.findAll('.fact-item')
      expect(factItems.length).toBe(6) // Based on the fun facts data
    })

    it('displays fun facts with correct structure', () => {
      const factItems = wrapper.findAll('.fact-item')
      
      factItems.forEach(fact => {
        expect(fact.find('.fact-icon').exists()).toBe(true)
        expect(fact.find('.fact-text').exists()).toBe(true)
      })
    })

    it('displays specific fun facts correctly', () => {
      const factItems = wrapper.findAll('.fact-item')
      
      // Coffee fact
      expect(factItems[0].find('.fact-icon').text()).toBe('☕')
      expect(factItems[0].find('.fact-text').text()).toBe('I can\'t start coding without my morning coffee ritual')
      
      // Night owl fact
      expect(factItems[1].find('.fact-icon').text()).toBe('🌙')
      expect(factItems[1].find('.fact-text').text()).toBe('My most productive coding hours are between 10 PM and 2 AM')
      
      // Problem solving fact
      expect(factItems[2].find('.fact-icon').text()).toBe('🎯')
      expect(factItems[2].find('.fact-text').text()).toBe('I solve complex problems better while taking walks')
      
      // Apps fact
      expect(factItems[3].find('.fact-icon').text()).toBe('📱')
      expect(factItems[3].find('.fact-text').text()).toBe('I have over 50 productivity and learning apps on my phone')
      
      // Code as art fact
      expect(factItems[4].find('.fact-icon').text()).toBe('🎨')
      expect(factItems[4].find('.fact-text').text()).toBe('I believe good code is like art - functional and beautiful')
      
      // Space technology fact
      expect(factItems[5].find('.fact-icon').text()).toBe('🚀')
      expect(factItems[5].find('.fact-text').text()).toBe('I dream of contributing to space technology projects someday')
    })
  })

  describe('Data Structure', () => {
    it('contains all expected interest categories', () => {
      const interestCards = wrapper.findAll('.interest-card')
      const expectedTitles = [
        'Technology Exploration',
        'Continuous Learning',
        'Gaming & Strategy',
        'Fitness & Wellness',
        'Music & Creativity',
        'Sustainability'
      ]
      
      expectedTitles.forEach((title, index) => {
        expect(interestCards[index].find('.interest-title').text()).toBe(title)
      })
    })

    it('has proper detail items for each interest', () => {
      const interestCards = wrapper.findAll('.interest-card')
      
      interestCards.forEach(card => {
        const details = card.findAll('.detail-item')
        expect(details.length).toBe(4) // Each interest should have 4 details
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      expect(wrapper.find('section').exists()).toBe(true)
      expect(wrapper.find('h2').exists()).toBe(true) // Main title
      expect(wrapper.findAll('h3').length).toBeGreaterThan(0) // Interest titles and fun facts title
    })

    it('uses semantic HTML elements', () => {
      expect(wrapper.find('section.personal-interests').exists()).toBe(true)
      expect(wrapper.findAll('p').length).toBeGreaterThan(0) // Descriptions and fact texts
    })
  })

  describe('CSS Classes', () => {
    it('has correct CSS classes for styling', () => {
      expect(wrapper.classes()).toContain('personal-interests')
      expect(wrapper.find('.interests-container').exists()).toBe(true)
      expect(wrapper.find('.interests-header').exists()).toBe(true)
      expect(wrapper.find('.interests-content').exists()).toBe(true)
    })

    it('has proper grid structure classes', () => {
      expect(wrapper.find('.interests-grid').exists()).toBe(true)
      expect(wrapper.find('.facts-grid').exists()).toBe(true)
    })
  })

  describe('Responsive Design Elements', () => {
    it('has responsive container structure', () => {
      expect(wrapper.find('.interests-container').exists()).toBe(true)
      expect(wrapper.find('.interests-content').exists()).toBe(true)
    })
  })
})