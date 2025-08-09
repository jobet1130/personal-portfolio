import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Skills from '../components/Skills.vue'
import { SkillLevel } from '../data/skills'

describe('Skills.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(Skills)
  })

  it('renders properly', () => {
    expect(wrapper.find('.skills').exists()).toBe(true)
    expect(wrapper.find('.skills-container').exists()).toBe(true)
    expect(wrapper.find('.skills-header').exists()).toBe(true)
    expect(wrapper.find('.skills-content').exists()).toBe(true)
  })

  it('displays the correct title and subtitle', () => {
    const title = wrapper.find('.skills-title')
    const subtitle = wrapper.find('.skills-subtitle')

    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Technical Skills')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toBe('Technologies and tools I use to build exceptional solutions')
  })

  it('renders category filter buttons', () => {
    const categoryButtons = wrapper.findAll('.category-btn')

    expect(categoryButtons.length).toBeGreaterThan(0)
    expect(categoryButtons[0].text()).toBe('All')

    // Check that other category buttons exist
    const buttonTexts = categoryButtons.map((btn) => btn.text())
    expect(buttonTexts).toContain('Frontend')
    expect(buttonTexts).toContain('Backend')
    expect(buttonTexts).toContain('Tools & DevOps')
  })

  it('has "All" category selected by default', () => {
    const activeButton = wrapper.find('.category-btn.active')

    expect(activeButton.exists()).toBe(true)
    expect(activeButton.text()).toBe('All')
  })

  it('renders skill cards', () => {
    const skillCards = wrapper.findAll('.skill-card')

    expect(skillCards.length).toBeGreaterThan(0)

    // Check first skill card structure
    const firstCard = skillCards[0]
    expect(firstCard.find('.skill-icon').exists()).toBe(true)
    expect(firstCard.find('.skill-name').exists()).toBe(true)
    expect(firstCard.find('.skill-description').exists()).toBe(true)
    expect(firstCard.find('.skill-level').exists()).toBe(true)
    expect(firstCard.find('.level-bar').exists()).toBe(true)
    expect(firstCard.find('.level-progress').exists()).toBe(true)
  })

  it('displays skill information correctly', () => {
    const skillCards = wrapper.findAll('.skill-card')
    const firstCard = skillCards[0]

    const skillName = firstCard.find('.skill-name')
    const skillDescription = firstCard.find('.skill-description')
    const levelLabel = firstCard.find('.level-label')

    expect(skillName.text()).toBeTruthy()
    expect(skillDescription.text()).toBeTruthy()
    expect(levelLabel.text()).toBeTruthy()

    // Check that level label is one of the valid skill levels
    const validLevels = Object.values(SkillLevel)
    expect(validLevels).toContain(levelLabel.text())
  })

  it('filters skills when category button is clicked', async () => {
    const initialSkillCount = wrapper.findAll('.skill-card').length

    // Find and click a specific category button (not "All")
    const categoryButtons = wrapper.findAll('.category-btn')
    const frontendButton = categoryButtons.find((btn) => btn.text() === 'Frontend')

    if (frontendButton) {
      await frontendButton.trigger('click')

      // Check that the button is now active
      expect(frontendButton.classes()).toContain('active')

      // Check that skills are filtered (should be different count)
      const filteredSkillCount = wrapper.findAll('.skill-card').length
      expect(filteredSkillCount).toBeLessThanOrEqual(initialSkillCount)
    }
  })

  it('shows correct active state for category buttons', async () => {
    const categoryButtons = wrapper.findAll('.category-btn')
    const backendButton = categoryButtons.find((btn) => btn.text() === 'Backend')

    if (backendButton) {
      await backendButton.trigger('click')

      // Check that only the clicked button is active
      const activeButtons = wrapper.findAll('.category-btn.active')
      expect(activeButtons).toHaveLength(1)
      expect(activeButtons[0].text()).toBe('Backend')
    }
  })

  it('renders skills summary statistics', () => {
    const summaryStats = wrapper.find('.summary-stats')
    const stats = wrapper.findAll('.stat')

    expect(summaryStats.exists()).toBe(true)
    expect(stats).toHaveLength(3)

    // Check stat structure
    stats.forEach((stat) => {
      expect(stat.find('.stat-number').exists()).toBe(true)
      expect(stat.find('.stat-label').exists()).toBe(true)
    })

    // Check stat labels
    const statLabels = stats.map((stat) => stat.find('.stat-label').text())
    expect(statLabels).toContain('Total Skills')
    expect(statLabels).toContain('Advanced+')
    expect(statLabels).toContain('Categories')
  })

  it('displays numeric values in statistics', () => {
    const statNumbers = wrapper.findAll('.stat-number')

    statNumbers.forEach((statNumber) => {
      const value = parseInt(statNumber.text())
      expect(value).toBeGreaterThan(0)
      expect(Number.isInteger(value)).toBe(true)
    })
  })

  it('has proper data attributes for skill levels', () => {
    const skillCards = wrapper.findAll('.skill-card')

    skillCards.forEach((card) => {
      const levelAttr = card.attributes('data-level')
      expect(levelAttr).toBeTruthy()

      // Check that data-level is a valid skill level (lowercase)
      const validLevels = Object.values(SkillLevel).map((level) => level.toLowerCase())
      expect(validLevels).toContain(levelAttr)
    })
  })

  it('renders skill icons', () => {
    const skillIcons = wrapper.findAll('.skill-icon .icon')

    expect(skillIcons.length).toBeGreaterThan(0)

    skillIcons.forEach((icon) => {
      expect(icon.exists()).toBe(true)
      // Check that it's an SVG element
      expect(icon.element.tagName.toLowerCase()).toBe('svg')
    })
  })

  it('has proper semantic structure', () => {
    const section = wrapper.find('section')

    expect(section.exists()).toBe(true)
    expect(section.attributes('id')).toBe('skills')

    // Check heading hierarchy
    const mainTitle = wrapper.find('h2.skills-title')
    const skillNames = wrapper.findAll('h3.skill-name')

    expect(mainTitle.exists()).toBe(true)
    expect(skillNames.length).toBeGreaterThan(0)
  })

  it('renders without errors', () => {
    expect(() => mount(Skills)).not.toThrow()
  })

  it('has responsive grid structure', () => {
    const skillsGrid = wrapper.find('.skills-grid')

    expect(skillsGrid.exists()).toBe(true)
    expect(skillsGrid.findAll('.skill-card').length).toBeGreaterThan(0)
  })

  it('shows progress bars with correct widths', () => {
    const progressBars = wrapper.findAll('.level-progress')

    progressBars.forEach((progressBar) => {
      const style = progressBar.attributes('style')
      expect(style).toContain('width:')

      // Extract width value and check it's a valid percentage
      const widthMatch = style?.match(/width:\s*([\d.]+%)/)
      if (widthMatch) {
        const widthValue = parseFloat(widthMatch[1])
        expect(widthValue).toBeGreaterThan(0)
        expect(widthValue).toBeLessThanOrEqual(100)
      }
    })
  })
})
