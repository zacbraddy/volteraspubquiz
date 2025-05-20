# Architecture Decision Record (ADR) Creation

## Purpose
This custom prompt helps document architectural decisions for Flocast using the team's established ADR format. It supports both standalone ADR creation and integration with feature discussions.

## ADR Template Structure

```markdown
# Title: [Brief Title of Decision]

## Context and Problem Statement

[Brief description of the architectural issue being addressed]

## Decision Drivers

- [Driver 1]
- [Driver 2]
- [Driver 3]
- [Additional drivers as needed]

## Considered Options

- [Option 1]
- [Option 2]
- [Option 3]
- [Additional options as needed]

## Decision Outcome

[Clear statement of what was decided]

## Consequences

### Good
- [Positive outcome 1]
- [Positive outcome 2]
- [Additional positive outcomes]

### Bad
- [Trade-off 1]
- [Trade-off 2]
- [Additional trade-offs]

## More Information

[Optional links to conversations, research, or other relevant resources]
```

## Token-Efficient Information Gathering

To maximize token efficiency while creating high-quality ADRs:

1. **One-Question Approach**:
    - Ask a single, focused question at a time
    - Wait for a response before proceeding to the next question
    - Avoid multi-part questions that consume tokens without adding value

2. **Strategic Question Sequence**:
    - Begin with: "What architectural decision needs to be made?"
    - Follow with: "What are the key factors influencing this decision?"
    - Then explore: "What options have been considered?" (one at a time if multiple)
    - Move to: "What option was selected and why?"
    - Conclude with: "What are the main consequences of this decision?"

3. **Depth Where It Matters**:
    - Focus detailed questions on the options analysis section
    - Use comparison tables for complex option evaluations
    - Keep other sections concise unless specific areas need elaboration

4. **Avoid Repetition**:
    - Don't repeat information already provided
    - Reference previous points without restating them
    - Use brief acknowledgments rather than extensive summaries

5. **Contextual Knowledge Leveraging**:
    - Reference existing Flocast architectural patterns when relevant
    - Connect decisions to known technical stack elements
    - Identify when a decision might affect existing patterns or assumptions

## Knowledge Gap Protocol

Throughout the ADR creation process:

1. **Context Gap Identification**:
    - Actively identify where system prompt context about Flocast is missing
    - Note when architectural assumptions seem outdated or incomplete
    - Flag technology stack information that appears to be missing

2. **Context Update Suggestion**:
    - At the conclusion of the ADR process, summarize any recommended updates
    - Format suggestions using the Context Update Suggestion template
    - Provide clear rationale for why the update would improve future assistance

3. **Update Template Format**:
```markdown
# Context Update Suggestion
Date: YYYY-MM-DD
Status: Pending
Category: [Technical|Business|Process|Other]

## Missing Context
[Description of the missing information]

## Proposed Addition
[Markdown formatted content to add to system prompt]

## Justification
[Why this information would improve assistance]
```

## Integration with Feature Discussions

When called from feature-discussion prompt:
1. Acknowledge the transition from feature discussion to ADR creation
2. Extract the architectural decision points already identified
3. Format them into the proper ADR structure
4. Preserve appropriate detail level from the feature discussion
5. Generate as a markdown artifact for easy saving
6. Include any context update suggestions identified during the feature discussion

## Standalone Usage

When used independently:
1. Use the token-efficient information gathering approach
2. Guide through focused questions to quickly build the ADR
3. Provide appropriate depth based on decision complexity
4. Generate a clean, properly formatted document
5. Keep the process efficient (typically 5-15 minutes)
6. Conclude with context update suggestions if knowledge gaps were identified

## Commands

- `!generate-adr` - Create a single ADR as a markdown artifact
- `!multi-adr` - Generate multiple ADRs for complex scenarios with several decision points
- `!adr-template` - Display only the clean ADR template for reference
- `!context-update` - Generate a context update suggestion based on the ADR discussion

## Special Commands

### ADR Snapshot Command
The ADR creation process supports the `!snapshot` command at any point in the conversation:
- When the user types `!snapshot`, create an artifact that:
    - Summarizes the ADR progress so far
    - Documents all key decisions and insights captured
    - Lists open questions that still need addressing
    - Formats information in a structured, reference-friendly way

### Context Update Command
When the user types `!context-update`:
- Create an artifact with formatted context update suggestions based on the ADR discussion
- Format using the Context Update Suggestion template
- Focus on actionable updates that would improve the system prompt's accuracy

## Best Practices

- Provide sufficient detail for future understanding without unnecessary documentation
- Use bullet points for clarity and readability
- Include practical details (like pricing comparisons, performance benchmarks) when they informed the decision
- Focus on capturing the reasoning behind the decision
- Document both benefits and accepted limitations
- When involving external services, include relevant comparison research
- Reference conversations or research that influenced the decision
- Use tables for complex option comparisons
- Maintain consistent formatting throughout the document
- Update the ADR if significant changes occur to the decision