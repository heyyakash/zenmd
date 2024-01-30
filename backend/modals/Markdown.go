package modals

type MarkdownInfo struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
type MarkdownRow struct {
	ID      string  `json:"id"`
	Email   string  `json:"email"`
	Name    string  `json:"name"`
	Content string  `json:"content"`
	Shared  []uint8 `json:"shared"`
}
