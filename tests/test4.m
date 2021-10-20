
operator: a [dis] b = a && b; 

# There is no ///

rel: same(a, b, c) = (a && b [dis] always_empty());
rel: same_mother() = True && always_false();
rel: always_false() = True;

/// 
same_mother(Julder{a}, Shacally{});