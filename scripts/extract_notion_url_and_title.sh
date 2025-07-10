#!/bin/bash

# Extract Notion URL and get title
# Usage: ./extract_notion_url_and_title.sh <pull_request_body> <notion_api_token>

set -e

PR_BODY="$1"
NOTION_API_TOKEN="$2"

# Extract Notion URL from PR body
NOTION_URL=$(echo "$PR_BODY" | grep -oE 'https://www\.notion\.so[^\s]*' | head -1)
echo "notion_url=$NOTION_URL"

if [ -n "$NOTION_URL" ]; then
  # Extract page ID from URL
  PAGE_ID=$(echo "$NOTION_URL" | grep -oE '[a-f0-9]{32}' | head -1)
  
  if [ -n "$PAGE_ID" ]; then
    # Get page title and emoji using Notion API
    RESPONSE=$(curl -s -X GET "https://api.notion.com/v1/pages/$PAGE_ID" \
      -H "Authorization: Bearer $NOTION_API_TOKEN" \
      -H "Notion-Version: 2022-06-28")
    
    TITLE=$(echo "$RESPONSE" | jq -r '.properties.Title.title[0].text.content // .properties.Name.title[0].text.content // "タイトル取得エラー"')
    EMOJI=$(echo "$RESPONSE" | jq -r '.icon.emoji // ""')
    
    if [ -n "$EMOJI" ]; then
      FULL_TITLE="$EMOJI $TITLE"
    else
      FULL_TITLE="$TITLE"
    fi
    
    echo "notion_title=$FULL_TITLE"
  else
    echo "notion_title=ページIDの抽出に失敗しました"
  fi
else
  echo "notion_title="
fi
