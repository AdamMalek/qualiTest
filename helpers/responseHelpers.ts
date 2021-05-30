export function notFound(res: any) {
    res.status(404);
    res.render('error_404');
}

export function serverError(res: any, message: string) {
    res.status(500);
    res.render('error_500', { message });
}