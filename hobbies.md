---
title: My Hobbies
layout: boxed
---

{% assign hobbies = site.data.profile.hobbies %}
{% for hobby in hobbies.items %}
{% if hobby.link %}
- [{{ hobby.name }}![]({{ hobby.icon }})](hobby.link)
{% else %}
- {{hobby.name}}![]({{ hobby.icon }})
{% endif %}
{% endfor %}
