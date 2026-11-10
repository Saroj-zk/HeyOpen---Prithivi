# Working with files and documents

Hey Open's public product examples include document analysis, and the memory page illustrates an option to upload PDF or text files for retrieval alongside saved context. The illustrated memory file control states a **10 MB limit per file**, but the effective production limits may vary by feature.

## Before you upload

Choose a model or feature that accepts the intended file type. Review the displayed file-size limit, permissions, and privacy route. Files may need temporary processing to extract text, analyze images, or generate outputs.

## A useful document-review workflow

1. Open a supported chat or memory upload control.
2. Choose a document you are authorized to process.
3. Specify the task, such as summarization, clause review, or comparison.
4. Ask for references to page or section numbers when available.
5. Check every cited passage against the original document.
6. Delete saved memory or local copies if they are no longer needed.

## Example prompts

> Summarize the decision points in this proposal. Separate confirmed facts from assumptions and questions.

> Compare the termination clauses in these two agreements. Quote short clause fragments with section references and flag uncertainty.

## Limits and cautions

Not all models accept files. A model can misread tables, diagrams, or scanned pages. Large documents may be truncated or chunked. File upload does not necessarily imply permanent online storage or cross-device synchronization.

Do not upload sensitive personal or enterprise data until the relevant processing configuration has been approved for that information.
