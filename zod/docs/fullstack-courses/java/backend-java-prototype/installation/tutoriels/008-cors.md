
appelle cette méthode au début de chaque méthode doXXX

@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    setCorsHeaders(response);
    ...
}


ajouter doOptions

@Override
protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    setCorsHeaders(response);
    response.setStatus(HttpServletResponse.SC_OK);
}
