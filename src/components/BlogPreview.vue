<template>
  <BlogCard :post="post" />
</template>

<script setup lang="ts">
import BlogCard from './BlogCard.vue'
import type { BlogPost } from '../data/blog'

interface Props {
  post: BlogPost
}

defineProps<Props>()
</script>

<!-- No styles needed - BlogCard handles its own styling -->
