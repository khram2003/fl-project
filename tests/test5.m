
operator: a [dis] b = a && b; 
///

rel: same(a, b, c) = (a && b [dis] always_empty());
rel: same_mother() = True && always_false();

/// 
# There is no rel_call same_mother(Julder{a}, Shacally{});