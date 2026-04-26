#!/usr/bin/env python3
import re

with open('app/tarot/learn-more/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Zero-width space character
zwsp = '\u200b'
# Pattern to split on: space + zwsp + space
pattern = f' {zwsp} '

# Find the content between <p> and </p> tags
p_start = content.find('<p>')
p_end = content.find('</p>', p_start)

if p_start != -1 and p_end != -1:
    # Extract just the text content inside the first <p> tag
    para_content = content[p_start + 3:p_end]
    
    # Split by the zero-width space pattern
    parts = para_content.split(pattern)
    
    # Build new paragraphs
    new_paras = []
    for part in parts:
        # Clean up whitespace but preserve internal line breaks
        part = part.strip()
        if part:
            new_paras.append(part)
    
    # Create the replacement with proper indentation
    indent = '\t\t\t'
    replacement = ''
    for i, para in enumerate(new_paras):
        if i > 0:
            replacement += '\n'
        replacement += f'{indent}<p>\n{indent}\t{para}\n{indent}</p>'
    
    # Build the new content: everything before the first <p>, the new paragraphs, and everything after </p>
    before = content[:p_start]
    after = content[p_end + 4:]  # Skip the original </p>
    new_content = before + replacement + after
    
    # Write back
    with open('app/tarot/learn-more/page.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✓ Split {len(new_paras)} paragraphs successfully")
else:
    print("Could not find <p> tags")
