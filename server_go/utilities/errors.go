package utilities

func CheckError(e error) {
    if e != nil {
        panic(e)
    }
}
