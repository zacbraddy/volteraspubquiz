# Title: Task Runner Selection for Multi-Language Project

## Context and Problem Statement
The project requires managing multiple services with different languages (JavaScript and Python). While initially considering full monorepo tools, we needed to find a balance between developer experience and simplicity, particularly focusing on local development workflow and task automation.

## Decision Drivers
- 4-hour project time constraint
- Multi-language support requirements (JavaScript and Python)
- Need for production-ready tooling
- Developer experience (DX) requirements
- Desire for simple, unified command interface
- Build and dependency management across different language ecosystems

## Considered Options
### Full Monorepo Tools
- Nx
- Turborepo
- Moon

### Simple Task Management
- Make files with bash scripts
- go-task
- Plain bash scripts

## Decision Journey
1. Initially ruled out full monorepo tools due to:
    - Complexity for a simple frontend/backend project
    - Limited multi-language support for our specific needs
    - Time constraints for setup

2. Attempted Make files and bash scripts approach but encountered:
    - Quickly becoming cumbersome
    - Complexity in managing cross-language tasks
    - Maintenance overhead

3. Finally settled on go-task because:
    - Simple, focused task runner
    - Small, single binary implementation
    - YAML-based configuration
    - Cross-platform support

## Decision Outcome
Chose to implement go-task as a task runner with a standard multi-service directory structure. This provides task automation benefits without the complexity of a full monorepo solution.

## Consequences

### Good
- Lightweight solution with minimal setup time
- Simple YAML configuration for tasks
- Cross-platform compatibility
- Easy to understand and maintain
- Focused tool that does one thing well
- Can still use native toolchains for each language
- Better developer experience than raw scripts

### Bad
- Missing advanced monorepo features (caching, smart rebuilds)
- Manual management of cross-project dependencies
- Less integrated than a full monorepo solution
- May need to maintain more task configurations as project grows

## More Information
The structure maintains the possibility to migrate to a full monorepo tool in the future if needed, while providing immediate benefits for developer workflow and task automation.