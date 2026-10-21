<!-- SPDX-License-Identifier: CC0-1.0 -->

# Contributing Guidelines

The maintainers of `assert-time` welcome contributions and corrections. This
includes improvements to the documentation or code base, tests, bug fixes, and
implementations of new features. We recommend you open an issue before making
any substantial changes so you can be sure your work won't be rejected. But for
small changes, such as fixing a typo, you can open a Pull Request directly.

- Fork the repository.
- Create a new branch from the latest `main`.
- Make your changes on the new branch.
- Commit to the new branch and push the commit(s).
- Open a Pull Request against `main`.

In case you run into any issues while working on the project, e.g. the tests are
not working as you expect, checkout the `main` and run the relevant command(s).
If this does not _just work_, please open an issue with the full output log.

---

## Contributing Details

### Security

For security-related issues, please refer to the [security policy].

[security policy]: ./SECURITY.md

### Testing

All changes should pass the test suite on all supported Node.js versions. When
adding or changing behavior, a test in support of the change should be added.
When fixing a bug it may be necessary to change an existing test. It is *never*
allowed to reduce the set of Node.js versions tested against.

### Style

This project does not use automated means to format or style the code. Follow
the existing style as best you can, the maintainer's preferences regarding style
should always be followed.

Use tabs for JavaScript and spaces for JSON, MarkDown, and YAML.

---

## AI Use Policy

This project accepts contributions made with the *help* of AI, but not by AI.
The decision whether this is the case is at the discretion of the maintainers.

All contributions made with the help of AI should include an `Assisted-by` tag
at the end of the commit message. For example:

```text
Assisted-by: Claude Sonnet 4.6
```

The tag's value should include at least the model version and may include an
agent name in parentheses.

An AI tool *must* not be the commit author or listed in a `Co-authored-by` tag.
